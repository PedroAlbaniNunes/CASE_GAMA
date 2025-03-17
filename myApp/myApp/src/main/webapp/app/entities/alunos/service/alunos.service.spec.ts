import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { DATE_FORMAT } from 'app/config/input.constants';
import { IAlunos } from '../alunos.model';
import { sampleWithFullData, sampleWithNewData, sampleWithPartialData, sampleWithRequiredData } from '../alunos.test-samples';

import { AlunosService, RestAlunos } from './alunos.service';

const requireRestSample: RestAlunos = {
  ...sampleWithRequiredData,
  nascimento: sampleWithRequiredData.nascimento?.format(DATE_FORMAT),
};

describe('Alunos Service', () => {
  let service: AlunosService;
  let httpMock: HttpTestingController;
  let expectedResult: IAlunos | IAlunos[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(AlunosService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a Alunos', () => {
      const alunos = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(alunos).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Alunos', () => {
      const alunos = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(alunos).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Alunos', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Alunos', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Alunos', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addAlunosToCollectionIfMissing', () => {
      it('should add a Alunos to an empty array', () => {
        const alunos: IAlunos = sampleWithRequiredData;
        expectedResult = service.addAlunosToCollectionIfMissing([], alunos);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(alunos);
      });

      it('should not add a Alunos to an array that contains it', () => {
        const alunos: IAlunos = sampleWithRequiredData;
        const alunosCollection: IAlunos[] = [
          {
            ...alunos,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addAlunosToCollectionIfMissing(alunosCollection, alunos);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Alunos to an array that doesn't contain it", () => {
        const alunos: IAlunos = sampleWithRequiredData;
        const alunosCollection: IAlunos[] = [sampleWithPartialData];
        expectedResult = service.addAlunosToCollectionIfMissing(alunosCollection, alunos);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(alunos);
      });

      it('should add only unique Alunos to an array', () => {
        const alunosArray: IAlunos[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const alunosCollection: IAlunos[] = [sampleWithRequiredData];
        expectedResult = service.addAlunosToCollectionIfMissing(alunosCollection, ...alunosArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const alunos: IAlunos = sampleWithRequiredData;
        const alunos2: IAlunos = sampleWithPartialData;
        expectedResult = service.addAlunosToCollectionIfMissing([], alunos, alunos2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(alunos);
        expect(expectedResult).toContain(alunos2);
      });

      it('should accept null and undefined values', () => {
        const alunos: IAlunos = sampleWithRequiredData;
        expectedResult = service.addAlunosToCollectionIfMissing([], null, alunos, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(alunos);
      });

      it('should return initial array if no Alunos is added', () => {
        const alunosCollection: IAlunos[] = [sampleWithRequiredData];
        expectedResult = service.addAlunosToCollectionIfMissing(alunosCollection, undefined, null);
        expect(expectedResult).toEqual(alunosCollection);
      });
    });

    describe('compareAlunos', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareAlunos(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 164 };
        const entity2 = null;

        const compareResult1 = service.compareAlunos(entity1, entity2);
        const compareResult2 = service.compareAlunos(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 164 };
        const entity2 = { id: 5093 };

        const compareResult1 = service.compareAlunos(entity1, entity2);
        const compareResult2 = service.compareAlunos(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 164 };
        const entity2 = { id: 164 };

        const compareResult1 = service.compareAlunos(entity1, entity2);
        const compareResult2 = service.compareAlunos(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
