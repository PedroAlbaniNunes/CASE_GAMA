import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IAlunos } from '../alunos.model';
import { AlunosService } from '../service/alunos.service';

const alunosResolve = (route: ActivatedRouteSnapshot): Observable<null | IAlunos> => {
  const id = route.params.id;
  if (id) {
    return inject(AlunosService)
      .find(id)
      .pipe(
        mergeMap((alunos: HttpResponse<IAlunos>) => {
          if (alunos.body) {
            return of(alunos.body);
          }
          inject(Router).navigate(['404']);
          return EMPTY;
        }),
      );
  }
  return of(null);
};

export default alunosResolve;
