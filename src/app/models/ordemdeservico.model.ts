export interface OrdemDeServico {
    ordemdeservicoid: string;
    clienteid: string;
    veiculo: string;
    dataehoraentrada: Date;
}

export const ordemDeServicoConverter = {
    toFirestore: (ordemDeServico: any) => {
        return <OrdemDeServico>{
            clienteid: ordemDeServico.clienteid,
            veiculo: ordemDeServico.veiculo,
            dataehoraentrada: ordemDeServico.dataehoraentrada,
        };
    },
    fromFirestore: (snapshot: any, options: any) => {
        const data = snapshot.data(options);
        return <OrdemDeServico>{
            ordemdeservicoid: snapshot.id,
            clienteid: data.clienteid,
            veiculo: data.veiculo,
            dataehoraentrada: data.dataehoraentrada.toDate(),
        }
    }
};