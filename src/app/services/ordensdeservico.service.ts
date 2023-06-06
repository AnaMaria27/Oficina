import { Injectable } from "@angular/core";
import { OrdemDeServico } from "../models/ordemdeservico.model";
import { DatabaseService } from "./database.services";
import { databaseName } from "./database.statements";
import { Guid } from "guid-typescript";


@Injectable({
    providedIn: 'root'
})

export class OrdensDeServicoService {

    constructor(
        private databaseService: DatabaseService
    ) { }

    public async getAll() {
        const db = await this.databaseService.sqliteConnection.retrieveConnection(databaseName, false);
        db.open();
        let returnQuery = await db.query("SELECT * FROM ordensdeservico;");
        let ordensdeservico: OrdemDeServico[] = [];
        if (returnQuery.values!.length > 0) {
            for(let i = 0; i < returnQuery.values!.length; i++) {
                const ordemdeservico = returnQuery.values![i];
                console.log(`OS> ${ordemdeservico}`);
                ordensdeservico.push(ordemdeservico);
            }
        }
        return ordensdeservico;
    }
    public async getById(id:string): Promise<any>{
        try{
            const db= await this.databaseService.sqliteConnection.retrieveConnection(databaseName, false);
            const sql = 'select * from ordensdeservico whare oredemdeservico = ?' 
            try{
                db.open();
                const data = await db.query(sql,[id]);
                db.close();
                if (data.values!.length>0){
                    const ordemdeservico: OrdemDeServico = data.values![0];
                    ordemdeservico.dataehoraentrada = new Date(ordemdeservico.dataehoraentrada);
                    return ordemdeservico;
                }else{
                    return null;
                }
            }catch (e){
                return console.error(e);
            }
        }catch(e){
            return console.error(e);
        }
    }
    async update (ordemdeservico: OrdemDeServico): Promise <void> {
        let sql: any;
        let params: any;
        if (Guid.parse(ordemdeservico.ordemdeservicoid).isEmpty()) { 
            ordemdeservico.ordemdeservicoid = Guid.create().toString();
            sql = 'INSERT INTO ordensdeservico (ordemdeservicoid, clienteid, veiculo, dataehoraentrada)'+
            'values(?, ?, ?, ?)';
            params = [ordemdeservico.ordemdeservicoid, ordemdeservico.clienteid, ordemdeservico.veiculo, ordemdeservico.dataehoraentrada];
        } else {
        sql = 'UPDATE ordensdeservico SET clienteid = ?, veiculo = ?,+ dataehoraentrada = ? WHERW ordemdeservicoid = ?';
        params = [ordemdeservico.clienteid, ordemdeservico.veiculo, ordemdeservico.dataehoraentrada,
        ordemdeservico.ordemdeservicoid];
        }
        try {
            const db = await this.databaseService.sqliteConnection.retrieveConnection (databaseName, false);
            db.open();
            await db.run(sql, params);
            db.close();
        } catch (e) {
            console.error(e);
        }
    }
}