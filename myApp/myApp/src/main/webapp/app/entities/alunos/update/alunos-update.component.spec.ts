import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { AlunosService } from '../service/alunos.service';
import { IAlunos } from '../alunos.model';
import { AlunosFormService } from './alunos-form.service';

import { AlunosUpdateComponent } from './alunos-update.component';

describe('Alunos Management Update Component', () => {
  let comp: AlunosUpdateComponent;
  let fixture: ComponentFixture<AlunosUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let alunosFormService: AlunosFormService;
  let alunosService: AlunosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AlunosUpdateComponent],
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
      .overrideTemplate(AlunosUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(AlunosUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    alunosFormService = TestBed.inject(AlunosFormService);
    alunosService = TestBed.inject(AlunosService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const alunos: IAlunos = { id: 5093 };

      activatedRoute.data = of({ alunos });
      comp.ngOnInit();

      expect(comp.alunos).toEqual(alunos);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAlunos>>();
      const alunos = { id: 164 };
      jest.spyOn(alunosFormService, 'getAlunos').mockReturnValue(alunos);
      jest.spyOn(alunosService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ alunos });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: alunos }));
      saveSubject.complete();

      // THEN
      expect(alunosFormService.getAlunos).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(alunosService.update).toHaveBeenCalledWith(expect.objectContaining(alunos));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAlunos>>();
      const alunos = { id: 164 };
      jest.spyOn(alunosFormService, 'getAlunos').mockReturnValue({ id: null });
      jest.spyOn(alunosService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ alunos: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: alunos }));
      saveSubject.complete();

      // THEN
      expect(alunosFormService.getAlunos).toHaveBeenCalled();
      expect(alunosService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAlunos>>();
      const alunos = { id: 164 };
      jest.spyOn(alunosService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ alunos });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(alunosService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
