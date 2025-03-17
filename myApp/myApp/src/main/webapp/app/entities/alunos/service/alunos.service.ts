import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IAlunos, NewAlunos } from '../alunos.model';

export type PartialUpdateAlunos = Partial<IAlunos> & Pick<IAlunos, 'id'>;

type RestOf<T extends IAlunos | NewAlunos> = Omit<T, 'nascimento'> & {
  nascimento?: string | null;
};

export type RestAlunos = RestOf<IAlunos>;

export type NewRestAlunos = RestOf<NewAlunos>;

export type PartialUpdateRestAlunos = RestOf<PartialUpdateAlunos>;

export type EntityResponseType = HttpResponse<IAlunos>;
export type EntityArrayResponseType = HttpResponse<IAlunos[]>;

@Injectable({ providedIn: 'root' })
export class AlunosService {
  protected readonly http = inject(HttpClient);
  protected readonly applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/alunos');

  create(alunos: NewAlunos): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(alunos);
    return this.http
      .post<RestAlunos>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(alunos: IAlunos): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(alunos);
    return this.http
      .put<RestAlunos>(`${this.resourceUrl}/${this.getAlunosIdentifier(alunos)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(alunos: PartialUpdateAlunos): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(alunos);
    return this.http
      .patch<RestAlunos>(`${this.resourceUrl}/${this.getAlunosIdentifier(alunos)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestAlunos>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestAlunos[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getAlunosIdentifier(alunos: Pick<IAlunos, 'id'>): number {
    return alunos.id;
  }

  compareAlunos(o1: Pick<IAlunos, 'id'> | null, o2: Pick<IAlunos, 'id'> | null): boolean {
    return o1 && o2 ? this.getAlunosIdentifier(o1) === this.getAlunosIdentifier(o2) : o1 === o2;
  }

  addAlunosToCollectionIfMissing<Type extends Pick<IAlunos, 'id'>>(
    alunosCollection: Type[],
    ...alunosToCheck: (Type | null | undefined)[]
  ): Type[] {
    const alunos: Type[] = alunosToCheck.filter(isPresent);
    if (alunos.length > 0) {
      const alunosCollectionIdentifiers = alunosCollection.map(alunosItem => this.getAlunosIdentifier(alunosItem));
      const alunosToAdd = alunos.filter(alunosItem => {
        const alunosIdentifier = this.getAlunosIdentifier(alunosItem);
        if (alunosCollectionIdentifiers.includes(alunosIdentifier)) {
          return false;
        }
        alunosCollectionIdentifiers.push(alunosIdentifier);
        return true;
      });
      return [...alunosToAdd, ...alunosCollection];
    }
    return alunosCollection;
  }

  protected convertDateFromClient<T extends IAlunos | NewAlunos | PartialUpdateAlunos>(alunos: T): RestOf<T> {
    return {
      ...alunos,
      nascimento: alunos.nascimento?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restAlunos: RestAlunos): IAlunos {
    return {
      ...restAlunos,
      nascimento: restAlunos.nascimento ? dayjs(restAlunos.nascimento) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestAlunos>): HttpResponse<IAlunos> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestAlunos[]>): HttpResponse<IAlunos[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
