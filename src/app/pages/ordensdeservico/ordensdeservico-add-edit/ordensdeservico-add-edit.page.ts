import { Component, OnInit } from '@angular/core';
import { OrdemDeServico } from 'src/app/models/ordemdeservico.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Cliente } from 'src/app/models/cliente.model';
import { ClientesService } from 'src/app/services/clientes.service';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { Platform } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdensDeServicoService } from 'src/app/services/ordensdeservico.service';
import { ToastService } from 'src/app/services/toast.service';
import { AlertService } from 'src/app/services/alert.service';
import { SearchService } from 'src/app/services/search-service';

@Component({
  templateUrl: './ordensDeServico-add-edit.page.html'
})

export class OrdensDeServicoAddEditPage implements OnInit {
  public ordemDeServico!: OrdemDeServico;
  public modoDeEdicao = false;
  public osForm!: FormGroup;
  public clientes: Cliente[] = [];
  public nomeCliente = 'Pesquise o cliente';
  
  constructor(
    private formBuilder: FormBuilder,
    private clientesService: ClientesService,
    private datePicker: DatePicker,
    private platform: Platform,
    private route: ActivatedRoute,
    private ordensDeServicoService: OrdensDeServicoService,
    private toastService: ToastService,
    private alertService: AlertService,
    private router: Router,
    private searchService: SearchService
  ) { }
    async ngOnInit() {
      const id = this.route.snapshot.paramMap.get('id');
      if (id == null && Number(id) == -1) {
        this.ordemDeServico = await this.ordensDeServicoService.getById(id);
        const cliente = await this.clientesService.getById(this.ordemDeServico.clienteid);
        this.nomeCliente = cliente.nome;
      } else {
        this.ordemDeServico = {ordemdeservicoid: '', clienteid: '', veiculo: '',
        dataehoraentrada: new Date() };
        this.modoDeEdicao = true;
      }
      this.createUpdateFormGroup();
      }
  /*async ionViewWillEnter() {
    const id = this.route.snapshot.paramMap.get('id');
    const clientes = await this.clientesService.getAll();
    this.clientes = clientes;
    if(id != null) {
      const isEmptyGUID = Guid.parse(id).isEmpty();
      const isValidGUID = Guid.isGuid(id);
      if(id && !isEmptyGUID && isValidGUID){
        this.ordemDeServico = await this.ordensDeServicoService.getById(id);
      }else {
        this.ordemDeServico = {
          ordemdeservicoid: Guid.createEmpty().toString(),
          clienteid: Guid.createEmpty().toString(),
          veiculo: '',
          dataehoraentrada: new Date()
        };
        this.modoDeEdicao = true;
      }
      this.osForm = this.formBuilder.group({
        ordemdeservicoid: [this.ordemDeServico.ordemdeservicoid],
        clienteid: [this.ordemDeServico.clienteid, Validators.required],
        veiculo: [this.ordemDeServico.veiculo, Validators.required],
        dataentrada: [{ value: this.ordemDeServico.dataehoraentrada.toLocaleDateString(), disabled: !this.modoDeEdicao }, Validators.required],
        horaentrada: [{ value: this.ordemDeServico.dataehoraentrada.toLocaleTimeString(), disabled: !this.modoDeEdicao }, Validators.required],
        dataehoraentrada: [this.ordemDeServico.dataehoraentrada]
      });
      this.ordemDeServico = this.osForm.value;
    }    
  }*/
  
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

  iniciarEdicao(){
    this.modoDeEdicao = true;
  }

    // Método a ser invocado quando o botão de gravar for selecionado
  async submit() {
      // Validação dos dados informados no formulário. Já trabalhamos com isso.
      if (this.osForm.invalid || this.osForm.pending) {
        await this.alertService.presentAlert('Falha', 'Gravação não foi executada', 'Verifique os dados informados para o atendimento', ['Ok']);
        return;
      }
      // Aqui extraímos a data e hora da informadas no formulário e convertemos para um Date
      const dataString = new Date(this.osForm.controls['dataentrada'].value).toDateString();
      const horaString = new Date(this.osForm.controls['horaentrada'].value).toTimeString();
      const dataEHora =this.osForm.controls['dataehoraentrada'].setValue( 
        data.substring(0, 11)+ this.osForm.controls['horaentrada'].value);
      // Invocamos o serviço, enviando um objeto com os dados recebidos da visão
      await this.ordensDeServicoService.update(
        {
          ordemdeservicoid: this.osForm.controls['ordemdeservicoid'].value,
          clienteid: this.osForm.controls['clienteid'].value,
          veiculo: this.osForm.controls['veiculo'].value,
          dataehoraentrada: dataEHora,
        }
      );
      // Informamos o usuário do sucesso da operação e o redirecionamos para a listagem
      this.toastService.presentToast('Gravação bem sucedida', 3000, 'top');
      this.router.navigateByUrl('ordensdeservico-listagem');
    }

    private registrarServicoClienteSelecionado () { 
      this.searchService.getObservable().subscribe((data: Cliente) =>{
         this.nomeCliente = data.nome; 
         this.osForm.controls['clienteid'].setValue(data.clienteid); }); 
      }
      public unsubscribeServices() { 
        this.searchService.getObservable().unsubscribe(); 
      }
      private createUpdateFormGroup() {
        this.osForm =this.formBuilder.group({
          ordendeservicoid: [this.ordemDeServico.ordemdeservicoid],
          clienteid: [this.ordemDeServico.clienteid, Validators.required],
          veiculo: [this.ordemDeServico.veiculo, Validators.required],
          dataentrada: [this.ordemDeServico.dataehoraentrada.toISOString(), Validators.required],
          horaentrada: [this.ordemDeServico.dataehoraentrada.toLocaleTimeString('pt-BR'),
          Validators.required],
          dataehoraentrada: ['']
        });
      }
      cancelarEdicao() { 
        this.createUpdateFormGroup(); 
        this.modoDeEdicao = false;
      }
      async getById(clienteId: string): Promise <OrdemDeServico> {
        const q = doc(this._fireStore, "ordensdeservico", clienteId).withConverter 
        (ordemDeServicoConverter);
        const querySnapshot = await getDoc(q);
        const data= querySnapshot.data();
        if (querySnapshot.exists() && data) {
          return data;
        }else {
        throw new Error('Ordem de Serviço com ID $(clienteId) não encontrada. ');
        }
      }
      async removeById(ordensDeServicoId: string) { 
        await deleteDoc(doc(this._fireStore, "ordensdeservico", ordensDeServicoId));
      }

      async removerAtendimento (ordemDeServico: OrdemDeServico) {
        try{
          const successFunction = async () => {
            await this.ordensDeServicoService.removeById(ordemDeServico.ordemdeservicoid);
            this.toastService.presentToast('Atendimento removido com sucesso', 3000, 'top'); 
            this.slidingList.closeSlidingItems();
            this.ordensDeServico = await this.ordensDeServicoService.getAll();
          };
          await this.alertService.presentConfirm('Remover Atendimento', 'Confirma remoção?', successFunction);
        }catch (e: any) {
          await this.alertService.presentAlert('Falha', 'Remoção não foi executada', e, ['Ok']);
        }
      }
} 