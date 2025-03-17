import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { IAlunos } from 'app/entities/alunos/alunos.model';
import { AlunosService } from 'app/entities/alunos/service/alunos.service';
import { MetaService } from '../service/meta.service';
import { IMeta } from '../meta.model';
import { MetaFormService } from './meta-form.service';

import { MetaUpdateComponent } from './meta-update.component';

describe('Meta Management Update Component', () => {
  let comp: MetaUpdateComponent;
  let fixture: ComponentFixture<MetaUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let metaFormService: MetaFormService;
  let metaService: MetaService;
  let alunosService: AlunosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MetaUpdateComponent],
      providers: [
        provideHttpClient(),
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(MetaUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(MetaUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    metaFormService = TestBed.inject(MetaFormService);
    metaService = TestBed.inject(MetaService);
    alunosService = TestBed.inject(AlunosService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Alunos query and add missing value', () => {
      const meta: IMeta = { id: 7336 };
      const aluno: IAlunos = { id: 164 };
      meta.aluno = aluno;

      const alunosCollection: IAlunos[] = [{ id: 164 }];
      jest.spyOn(alunosService, 'query').mockReturnValue(of(new HttpResponse({ body: alunosCollection })));
      const additionalAlunos = [aluno];
      const expectedCollection: IAlunos[] = [...additionalAlunos, ...alunosCollection];
      jest.spyOn(alunosService, 'addAlunosToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ meta });
      comp.ngOnInit();

      expect(alunosService.query).toHaveBeenCalled();
      expect(alunosService.addAlunosToCollectionIfMissing).toHaveBeenCalledWith(
        alunosCollection,
        ...additionalAlunos.map(expect.objectContaining),
      );
      expect(comp.alunosSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const meta: IMeta = { id: 7336 };
      const aluno: IAlunos = { id: 164 };
      meta.aluno = aluno;

      activatedRoute.data = of({ meta });
      comp.ngOnInit();

      expect(comp.alunosSharedCollection).toContainEqual(aluno);
      expect(comp.meta).toEqual(meta);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IMeta>>();
      const meta = { id: 14440 };
      jest.spyOn(metaFormService, 'getMeta').mockReturnValue(meta);
      jest.spyOn(metaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ meta });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: meta }));
      saveSubject.complete();

      // THEN
      expect(metaFormService.getMeta).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(metaService.update).toHaveBeenCalledWith(expect.objectContaining(meta));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IMeta>>();
      const meta = { id: 14440 };
      jest.spyOn(metaFormService, 'getMeta').mockReturnValue({ id: null });
      jest.spyOn(metaService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ meta: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: meta }));
      saveSubject.complete();

      // THEN
      expect(metaFormService.getMeta).toHaveBeenCalled();
      expect(metaService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IMeta>>();
      const meta = { id: 14440 };
      jest.spyOn(metaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ meta });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(metaService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareAlunos', () => {
      it('Should forward to alunosService', () => {
        const entity = { id: 164 };
        const entity2 = { id: 5093 };
        jest.spyOn(alunosService, 'compareAlunos');
        comp.compareAlunos(entity, entity2);
        expect(alunosService.compareAlunos).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
