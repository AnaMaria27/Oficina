import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrdensDeServicoListagemPageRoutingModule } from './ordensdeservico-listagem-routing.module';

import { OrdensDeServicoListagemPage } from './ordensdeservico-listagem.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrdensDeServicoListagemPageRoutingModule
  ],
  declarations: [OrdensDeServicoListagemPage]
})
export class OrdensDeServicoListagemPageModule {}
