import { Injectable } from "@angular/core";
import {Cliente, clienteConverter} from '../models/cliente.model';
import { Firestore, collection, getDocs, setDoc, doc, query, orderBy, getDoc, deleteDoc} from '@angular/fire/firestore';

@Injectable({
    providedIn: 'root'
})

export class ClientesService{
    constructor(
        private _fireStore: Firestore,
    ){

    }

    async create(cliente: Cliente): Promise<void> {
        try{
            cliente.nascimento = new Date(cliente.nascimento);
            const clientesRef = collection(this._fireStore, "clientes");
            await setDoc(doc(clientesRef), {
                nome: cliente.nome,
                email: cliente.email,
                telefone: cliente.telefone,
                renda: cliente.renda,
                nascimento: cliente.nascimento,
            });
        } catch (e) {
            console.error(e);
        }
    }

    async getAll(): Promise<Cliente[]> {
        const clientes: Cliente[] = [];
        const q = query(collection(this._fireStore, "clientes"), orderBy("nome")).withConverter(clienteConverter);
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) =>{
            clientes.push(doc.data());
        });
        return clientes;
    }

    async getById(clienteId: string): Promise<Cliente>{
        const q = doc(this._fireStore, "clientes",clienteId).withConverter(clienteConverter);
        const querySnapshot = await getDoc(q);
        const data = querySnapshot.data();
        if(data) {
            return data as Cliente;
        }else{
            throw new Error("Cliente não encontrado");
        }
    }

    async update(cliente: Cliente){
        await setDoc(doc(this._fireStore, "clientes", cliente.clienteid).withConverter(clienteConverter),cliente);
    }

    async removeById(clienteId: string){
        await deleteDoc(doc(this._fireStore, "clientes", clienteId)); 
    }


}

/*import { DatabaseService } from "./database.services";
import { databaseName } from "./database.statements";
import { Cliente } from "../models/cliente.model";


@Injectable({
    providedIn: 'root'
})

export class ClientesService {
    constructor( 
        private databaseService: DatabaseService
    ) {}

    public async getAll(){
        const db = await this.databaseService.sqliteConnection.retrieveConnection(databaseName, false);
        db.open();
        let returnQuery = await db.query("SELECT * FROM clientes ORDER BY nome");
        db.close();
        if(returnQuery.values!.length > 0){
            let clientes: Cliente[] = [];
            for(let i = 0; i <returnQuery.values!.length; i++){
                const cliente = returnQuery.values![i];
                //console.log(`OS> ${ordemdeservico}`);
                clientes.push(cliente);
            }
            return clientes;
        }
        return [];
    }
}*/