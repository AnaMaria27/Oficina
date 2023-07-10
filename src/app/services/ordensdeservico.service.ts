import { Injectable } from "@angular/core";
import { OrdemDeServico, ordemDeServicoConverter } from "../models/ordemdeservico.model";
import { DatabaseService } from "./database.services";
import { databaseName } from "./database.statements";
import { Guid } from "guid-typescript";
import { collection, Firestore, getDocs, orderBy, query } from "firebase/firestore";


@Injectable({
    providedIn: 'root'
})

export class OrdensDeServicoService {



    constructor(
        private databaseService: DatabaseService,
        private _fireStore: Firestore,
    ) { }

    public async getAll(): Promise<OrdemDeServico[]> {
        const ordensDeServico: OrdemDeServico[] = [];
        const q = query(collection(this._fireStore, "ordensdeservico"), orderBy ("dataehoraentrada", "desc")).withConverter(ordemDeServicoConverter);
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            ordensDeServico.push(doc.data());
        });
        return ordensDeServico;
    }

    public async getById(id:string): Promise<any> {
        try{
            const db = await this.databaseService.sqliteConnection.retrieveConnection(databaseName, false);
            const sql = 'select * from ordensdeservico where ordemdeservicoid = ?';
            try{
                db.open();
                const data = await db.query(sql, [id]);
                db.close();
                if(data.values!.length > 0){
                    const ordemdeservico: OrdemDeServico = data.values![0];
                    ordemdeservico.dataehoraentrada = new Date (ordemdeservico.dataehoraentrada);
                    return ordemdeservico;
                }else {
                    return null;
                }
            }catch(e){
                return console.error(e);
            }
        }catch (e){
            return console.error(e);
        }
    }

    async removeById(id: string): Promise<boolean | void> {
        try{
            const db = await this.databaseService.sqliteConnection.retrieveConnection(databaseName, false);
            db.open();
            await db.run('DELETE FROM ordensdeservico WHERE ordemdeservicoid = ?',[id]);
            db.close();
            return true;
        } catch (e) {
            console.error(e);
        }
    }
    async update(ordemDeServico: OrdemDeServico) {
        ordemDeServico.dataehoraentrada= new Date(ordemDeServico.dataehoraentrada); 
        const clientesRef = collection(this._fireStore, "ordensdeservico");
        if (ordemDeServico.ordemdeservicoid.length == 0) { 
            await setDoc(doc(clientesRef).withConverter(ordemDeServicoConverter), ordemDeServico);
        } else {
            await setDoc(doc(this._fireStore, "ordensdeservico", ordemDeServico. ordemdeservicoid).withConverter (ordemDeServicoConverter), ordemDeServico);
        }
    }
 
    async submit() {
        if (this.osForm.invalid || this.osForm.pending) { 
            await this.alertService.presentAlert('Falha', 'Gravação não foi executade', 'Verifique os dados informados para o atendimento', ['Ok']);
            return;
        }
        const loading = await this.loadingCtrl.create();
        await loading.present();
        const data= new Date(this.osForm.controls['dataentrada'].value).toISOString();
        const hora = new Date(this.osForm.controls['horaentrada'].value).toISOString();
        this.osForm.controls! ['dataehoraentrada'].setValue( 
            data.substring(8, 11)+ hora.substring(11, 22)
        ):
        await this.ordensDeServicoService.update(this.osForm.value);
        loading.dismiss().then(() =>{
        this.toastService.presentToast('Gravação bem sucedida', 3680, 'top'); 
        this.router.navigateByUrl('ordensdeservico-listagem');
        });
        }

