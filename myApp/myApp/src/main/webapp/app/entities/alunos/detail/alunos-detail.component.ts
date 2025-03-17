import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { FormatMediumDatePipe } from 'app/shared/date';
import { IAlunos } from '../alunos.model';

@Component({
  selector: 'jhi-alunos-detail',
  templateUrl: './alunos-detail.component.html',
  imports: [SharedModule, RouterModule, FormatMediumDatePipe],
})
export class AlunosDetailComponent {
  alunos = input<IAlunos | null>(null);

  previousState(): void {
    window.history.back();
  }
}
