import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientesAddEditPage } from './clientes-add-edit.page';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: ClientesAddEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), ReactiveFormsModule],
  exports: [RouterModule],
})
export class ClientesAddEditPageRoutingModule {}
