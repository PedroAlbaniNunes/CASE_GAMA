import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import AlunosResolve from './route/alunos-routing-resolve.service';

const alunosRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/alunos.component').then(m => m.AlunosComponent),
    data: {
      defaultSort: `id,${ASC}`,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/alunos-detail.component').then(m => m.AlunosDetailComponent),
    resolve: {
      alunos: AlunosResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/alunos-update.component').then(m => m.AlunosUpdateComponent),
    resolve: {
      alunos: AlunosResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/alunos-update.component').then(m => m.AlunosUpdateComponent),
    resolve: {
      alunos: AlunosResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default alunosRoute;
