import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'authority',
    data: { pageTitle: 'myCaseApp.adminAuthority.home.title' },
    loadChildren: () => import('./admin/authority/authority.routes'),
  },
  {
    path: 'alunos',
    data: { pageTitle: 'myCaseApp.alunos.home.title' },
    loadChildren: () => import('./alunos/alunos.routes'),
  },
  {
    path: 'meta',
    data: { pageTitle: 'myCaseApp.meta.home.title' },
    loadChildren: () => import('./meta/meta.routes'),
  },
  /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
];

export default routes;
