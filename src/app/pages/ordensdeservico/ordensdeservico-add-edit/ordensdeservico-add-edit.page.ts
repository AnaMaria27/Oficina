import { Component, OnInit } from '@angular/core';
import { OrdemDeServico } from 'src/app/models/ordemdeservico.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Guid } from 'guid-typescript';
import { Cliente } from 'src/app/models/cliente.model';
import { ClientesService } from 'src/app/services/clientes.service';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { Platform } from '@ionic/angular';

@Component({
  templateUrl: './ordensDeServico-add-edit.page.html'
})

export class OrdensDeServicoAddEditPage implements OnInit {
  public ordemDeServico!: OrdemDeServico;
  public modoDeEdicao = false;
  public osForm!: FormGroup;
  public clientes: Cliente[] = [];
  
  constructor(
    private formBuilder: FormBuilder,
    private clientesService: ClientesService,
    private datePicker: DatePicker,
    private platform: Platform,
  ) { }

  async ngOnInit() {
  }

  async ionViewWillEnter() {
    const clientes = await this.clientesService.getAll();
    this.clientes = clientes;
    this.ordemDeServico = {
      ordemdeservicoid: Guid.createEmpty().toString(),
      clienteid: Guid.createEmpty().toString(),
      veiculo: '',
      dataehoraentrada: new Date()
    };
    this.modoDeEdicao = true;
    this.osForm = this.formBuilder.group({
      ordemdeservicoid: [this.ordemDeServico.ordemdeservicoid],
      clienteid: [this.ordemDeServico.clienteid, Validators.required],
      veiculo: [this.ordemDeServico.veiculo, Validators.required],
      dataentrada: [{ value: this.ordemDeServico.dataehoraentrada.toLocaleDateString(), disabled: !this.modoDeEdicao }, Validators.required],
      horaentrada: [{ value: this.ordemDeServico.dataehoraentrada.toLocaleTimeString(), disabled: !this.modoDeEdicao }, Validators.required],
      dataehoraentrada: [this.ordemDeServico.dataehoraentrada]
    });
  }
  selecionarDataEntrada() {
    if (!this.modoDeEdicao) {
      return;
    }
    this.platform.ready().then(() => {
      if (this.platform.is('capacitor')) {
        this.datePicker.show({
          date: new Date(),
          mode: 'date',
          locale: 'pt-br',
          doneButtonLabel: 'Confirmar',
          cancelButtonLabel: 'Cancelar'
        }
        ).then(
          data => {
            this.osForm.controls['dataentrada'].setValue(data.toLocaleDateString());
            this.osForm.controls['horaentrada'].setValue('');
          }
        );
      } else {
        // instruções para execução no navegador
      }
    });
  }
  
  selecionarHoraEntrada() {
    if (!this.modoDeEdicao) {
      return;
    }
    this.platform.ready().then(() => {
      if (this.platform.is('capacitor')) {
        this.datePicker.show({
          date: new Date(),
          mode: 'time',
          locale: 'pt-br',
          doneButtonLabel: 'Confirmar',
          cancelButtonLabel: 'Cancelar'
        })
        .then(
          data => {
            const dataEHoraEntrada = new Date(this.osForm.controls['dataehoraentrada'].value)
            dataEHoraEntrada.setHours(data.getHours());
            dataEHoraEntrada.setMinutes(data.getMinutes());
            this.osForm.controls['horaentrada'].setValue(data.toLocaleTimeString());
            this.osForm.controls['dataehoraentrada'].setValue(dataEHoraEntrada.toISOString());
          }
        );
      } else {
        // instruções para execução no navegador
      }
    });
  }
}