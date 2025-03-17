import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IAlunos } from '../alunos.model';
import { AlunosService } from '../service/alunos.service';

@Component({
  templateUrl: './alunos-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class AlunosDeleteDialogComponent {
  alunos?: IAlunos;

  protected alunosService = inject(AlunosService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.alunosService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
