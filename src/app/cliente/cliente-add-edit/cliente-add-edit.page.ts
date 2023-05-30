import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-cliente-add-edit',
  templateUrl: './cliente-add-edit.page.html',
  styleUrls: ['./cliente-add-edit.page.scss'],
})
export class ClienteAddEditPage implements OnInit {

  cliente = {nascimento: null, renda: null, tel: null,
  email: null, nome: null};

 // @ViewChild('inputNome', {read: ElementRef}) nome!: ElementRef;
  
 clienteForm!: FormGroup;

 hasErrors = false;
 errorMessage: string[] | undefined;

 constructor(
  private formBuilder: FormBuilder,
  private alertController: AlertController,
  private toastController: ToastController
  ) {

   }

   async presentAlert(header: string, subHeader: string, message: string, buttons: string[]){
    const alert = await this.alertController.create({
      header,
      subHeader,
      message,
      buttons
    });
    await alert.present();
   }

   async presentToast(message: string, duration:number, position: 'top' | 'bottom'){
    const toast = await this.toastController.create({
      message,
      duration,
      position
    });
    toast.present();
   }

 validationMessages = {
  nome: [
    {type: 'required', message: 'Nome é obrigatório'},
    {type: 'minlenght', message: 'Nome deve ter ao menos 3 caracteres'},
    {type: 'maxlenght', message: 'Nome não pode ter mais que 50 caracteres'}
  ],
  renda: [
    {type: 'min', message: 'Renda precisa ser positiva'},
    {type: 'required', message: 'Renda é obrigatória'}
  ],
  email: [
    {type: 'email', message: 'Informe um e-mail válido'},
    {type: 'required', message: 'e-mail é obrigatório'}
  ],
  tel: [
    {type: 'required', message: 'Telefone é obrigatório'}
  ],
  nascimento: [
    {type: 'required', message: 'Nascimento é obrigatório'}
  ]
 }


  ngOnInit() {
    this.clienteForm = this.formBuilder.group({
      nome: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      tel: ['', Validators.required],
      renda: ['0', Validators.compose([Validators.required, Validators.min(0)])],
      nascimento: ['', Validators.required]
    });
  }

  public nome: string | undefined;

  async submit(){
    this.errorMessage = [];
    if(this.clienteForm.get('nome')!.hasError('required')){
      this.errorMessage.push('Nome é obrigatório');
    }
    if(this.clienteForm.get('email')!.hasError('required')){
      this.errorMessage.push('Email é obrigatório');
    }
    if(this.clienteForm.get('tel')!.hasError('required')){
      this.errorMessage.push('Telefone é obrigatório');
    }
    if(this.clienteForm.get('renda')!.hasError('required')){
      this.errorMessage.push('Renda é obrigatório');
    }
    if(this.clienteForm.get('nascimento')!.hasError('required')){
      this.errorMessage.push('Nascimento é obrigatório');
    }
    this.hasErrors = this.errorMessage.length >0;

    if(!this.hasErrors){
      await this.presentToast('Gravação bem sucedida', 3000,'top');
    }

   // console.log(this.nome.nativeElement.value);*/
  }

  //submit(inputNome: any, inputEmail: any, inputTelefone: any, inputRenda: any, inputNascimento: any){
  //  console.log(inputNome.value + '/'+
  //              inputEmail.value + '/'+
  //              inputTelefone.value+'/'+
  //              inputRenda.value+'/'+
  //              inputNascimento.value);
 // }

}
