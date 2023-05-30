import { Component, OnInit, ViewChild } from '@angular/core';
import { IonList } from '@ionic/angular';
import { Guid } from 'guid-typescript';
import { Peca } from 'src/app/models/peca.model';
import { PecasService } from 'src/app/services/pecas.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  templateUrl: './pecas-listagem.page.html',
})
export class PecasListagemPage implements OnInit {
  public pecas: any;

  @ViewChild('slidingList') slidingList!: IonList;
  
  constructor(
    private pecasService: PecasService,
    private toastService: ToastService
  ) { 
    
  }

  idAsString(id:Guid): string {
    const convertedId = JSON.parse(JSON.stringify(id));
    return convertedId.value;
  }

  ngOnInit(): void {
 
  }

  ionViewWillEnter() {
    this.pecasService.getAll().then(pecas => {
      this.pecas = pecas;
    });
  }

  async removerPeca(peca: Peca) {
    await this.pecasService.removeById(this.idAsString(peca.id));
    this.pecas = await this.pecasService.getAll();
    this.toastService.presentToast('Peça removida!', 3000, 'top');
    await this.slidingList.closeSlidingItems();
  }


}
