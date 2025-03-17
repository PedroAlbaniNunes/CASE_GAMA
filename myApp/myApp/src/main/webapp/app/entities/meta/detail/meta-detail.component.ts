import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { IMeta } from '../meta.model';

@Component({
  selector: 'jhi-meta-detail',
  templateUrl: './meta-detail.component.html',
  imports: [SharedModule, RouterModule],
})
export class MetaDetailComponent {
  meta = input<IMeta | null>(null);
  private metaRef: any;

  previousState(): void {
    window.history.back();
  }

  calcularDiferenca(): number {
    if (this.metaRef?.valor && this.metaRef.notaAnterior) {
      return this.metaRef.valor - this.metaRef.notaAnterior;
    }
    return 0; // Retorna 0 se não houver valores válidos
  }
}

