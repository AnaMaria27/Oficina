import { Injectable } from "@angular/core";
import { DatabaseService } from "./database.services";
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
}