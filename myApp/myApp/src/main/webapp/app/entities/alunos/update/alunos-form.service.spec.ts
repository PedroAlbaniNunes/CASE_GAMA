import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../alunos.test-samples';

import { AlunosFormService } from './alunos-form.service';

describe('Alunos Form Service', () => {
  let service: AlunosFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlunosFormService);
  });

  describe('Service methods', () => {
    describe('createAlunosFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createAlunosFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nome: expect.any(Object),
            cpf: expect.any(Object),
            matricula: expect.any(Object),
            nascimento: expect.any(Object),
            anoLetivo: expect.any(Object),
          }),
        );
      });

      it('passing IAlunos should create a new form with FormGroup', () => {
        const formGroup = service.createAlunosFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nome: expect.any(Object),
            cpf: expect.any(Object),
            matricula: expect.any(Object),
            nascimento: expect.any(Object),
            anoLetivo: expect.any(Object),
          }),
        );
      });
    });

    describe('getAlunos', () => {
      it('should return NewAlunos for default Alunos initial value', () => {
        const formGroup = service.createAlunosFormGroup(sampleWithNewData);

        const alunos = service.getAlunos(formGroup) as any;

        expect(alunos).toMatchObject(sampleWithNewData);
      });

      it('should return NewAlunos for empty Alunos initial value', () => {
        const formGroup = service.createAlunosFormGroup();

        const alunos = service.getAlunos(formGroup) as any;

        expect(alunos).toMatchObject({});
      });

      it('should return IAlunos', () => {
        const formGroup = service.createAlunosFormGroup(sampleWithRequiredData);

        const alunos = service.getAlunos(formGroup) as any;

        expect(alunos).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IAlunos should not enable id FormControl', () => {
        const formGroup = service.createAlunosFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewAlunos should disable id FormControl', () => {
        const formGroup = service.createAlunosFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
