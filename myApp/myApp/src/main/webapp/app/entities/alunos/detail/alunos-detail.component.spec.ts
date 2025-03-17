import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { AlunosDetailComponent } from './alunos-detail.component';

describe('Alunos Management Detail Component', () => {
  let comp: AlunosDetailComponent;
  let fixture: ComponentFixture<AlunosDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlunosDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              loadComponent: () => import('./alunos-detail.component').then(m => m.AlunosDetailComponent),
              resolve: { alunos: () => of({ id: 164 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(AlunosDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlunosDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load alunos on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', AlunosDetailComponent);

      // THEN
      expect(instance.alunos()).toEqual(expect.objectContaining({ id: 164 }));
    });
  });

  describe('PreviousState', () => {
    it('Should navigate to previous state', () => {
      jest.spyOn(window.history, 'back');
      comp.previousState();
      expect(window.history.back).toHaveBeenCalled();
    });
  });
});
