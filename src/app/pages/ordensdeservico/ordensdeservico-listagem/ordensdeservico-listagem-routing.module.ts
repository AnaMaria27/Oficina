import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrdensDeServicoListagemPage } from './ordensdeservico-listagem.page';

const routes: Routes = [
  {
    path: '',
    component: OrdensDeServicoListagemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdensDeServicoListagemPageRoutingModule {}
