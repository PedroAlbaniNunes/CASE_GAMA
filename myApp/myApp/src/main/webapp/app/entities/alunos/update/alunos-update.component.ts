import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IAlunos } from '../alunos.model';
import { AlunosService } from '../service/alunos.service';
import { AlunosFormGroup, AlunosFormService } from './alunos-form.service';

@Component({
  selector: 'jhi-alunos-update',
  templateUrl: './alunos-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class AlunosUpdateComponent implements OnInit {
  isSaving = false;
  alunos: IAlunos | null = null;

  protected alunosService = inject(AlunosService);
  protected alunosFormService = inject(AlunosFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: AlunosFormGroup = this.alunosFormService.createAlunosFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ alunos }) => {
      this.alunos = alunos;
      if (alunos) {
        this.updateForm(alunos);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const alunos = this.alunosFormService.getAlunos(this.editForm);
    if (alunos.id !== null) {
      this.subscribeToSaveResponse(this.alunosService.update(alunos));
    } else {
      this.subscribeToSaveResponse(this.alunosService.create(alunos));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAlunos>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(alunos: IAlunos): void {
    this.alunos = alunos;
    this.alunosFormService.resetForm(this.editForm, alunos);
  }
}
