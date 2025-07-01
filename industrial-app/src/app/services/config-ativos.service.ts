import { Injectable } from '@angular/core';
import { dateDiff } from 'src/app/helpers/helpers';

interface Active {
    id: number;
    name: string;
    icon: string;
    data: any;
}

@Injectable({ providedIn: 'root' })
export class ConfigAtivosService {
    public ativos: Active[] = [
        { id: 0, name: 'MBFL', icon: 'ent-bomba-Flutuante', data: null },
        { id: 1, name: 'MGEL', icon: 'ent-gerador', data: null },
        { id: 2, name: 'HIDR', icon: 'ent-hidrmetro', data: null },
        { id: 3, name: 'MBD1', icon: 'ent-motobomba-diesel', data: null },
        { id: 4, name: 'MBD2', icon: 'ent-motobomba-diesel', data: null },
        // { id: 5, name: 'MBD3', icon: 'ent-motobomba-diesel', data: null },
        { id: 5, name: 'CRT1', icon: 'ent-carretel', data: null },
        { id: 6, name: 'CRT2', icon: 'ent-carretel', data: null },
        { id: 7, name: 'CRT3', icon: 'ent-carretel', data: null },
        { id: 8, name: 'CNH1', icon: 'ent-canho', data: null },
        { id: 9, name: 'CNH2', icon: 'ent-canho', data: null },
        { id: 10, name: 'CNH3', icon: 'ent-canho', data: null },
        { id: 11, name: 'TRAT', icon: 'ent-tractor', data: null },
    ];
    dados: any;

    setDados(realtimeData: any) {
        if (realtimeData.metadata) {
            realtimeData = realtimeData.metadata;
        }
        this.dados = realtimeData;

        this.dados.forEach((data:any )=> {
            if (data.assetType) {
                if (data.assetType === 'MBD1') {
                    this.ativos[3].data = data; //MBD1
                } else if (data.assetType === 'MBD2') {
                    this.ativos[4].data = data; //MBD2
                } else if (data.assetType === 'TRAT') {
                    this.ativos[11].data = data; //TRAT
                }
            } else if (data.generator) {
                this.ativos[1].data = data.generator; //MGEL
                this.ativos[0].data = {
                    ...data.floatPump,
                    assetType: 'MBFL',
                }; //MBFL
                this.ativos[2].data = {
                    ...data.hidrometer,
                    assetType: 'HIDR',
                }; //HIDR
            } else if (data.carretel && data.carretel.assetType === 'CRT1') {
                this.ativos[5].data = data.carretel; //CRT1
                this.ativos[8].data = {
                    ...data.cannon,
                    assetType: 'CNH1',
                }; //CNH1
            } else if (data.carretel && data.carretel.assetType === 'CRT2') {
                this.ativos[6].data = data.carretel; //CRT2
                this.ativos[9].data = {
                    ...data.cannon,
                    assetType: 'CNH2',
                }; //CNH2
            } else if (data.carretel && data.carretel.assetType === 'CRT3') {
                this.ativos[7].data = data.carretel; //CRT3
                this.ativos[10].data = {
                    ...data.cannon,
                    assetType: 'CNH3',
                }; //CNH3
            }
        });
    }

    getAssets(realtimeData: any) {
        if (!realtimeData) return;
        if (realtimeData.metadata) {
            realtimeData = realtimeData.metadata;
        }
        this.ativos = [
            { id: 0, name: 'MBFL', icon: 'ent-bomba-Flutuante', data: null },
            { id: 1, name: 'MGEL', icon: 'ent-gerador', data: null },
            { id: 2, name: 'HIDR', icon: 'ent-hidrmetro', data: null },
            { id: 3, name: 'MBD1', icon: 'ent-motobomba-diesel', data: null },
            { id: 4, name: 'MBD2', icon: 'ent-motobomba-diesel', data: null },
            // { id: 5, name: 'MBD3', icon: 'ent-motobomba-diesel', data: null },
            { id: 5, name: 'CRT1', icon: 'ent-carretel', data: null },
            { id: 6, name: 'CRT2', icon: 'ent-carretel', data: null },
            { id: 7, name: 'CRT3', icon: 'ent-carretel', data: null },
            { id: 8, name: 'CNH1', icon: 'ent-canho', data: null },
            { id: 9, name: 'CNH2', icon: 'ent-canho', data: null },
            { id: 10, name: 'CNH3', icon: 'ent-canho', data: null },
            { id: 11, name: 'TRAT', icon: 'ent-tractor', data: null },
        ];
        const assets = this.ativos;

        const hidrometer = realtimeData.filter((r:any) =>
            r.hasOwnProperty('hidrometer')
        );

        let date =
            hidrometer && hidrometer.length > 0
                ? new Date(Date.parse(hidrometer[0].hidrometer.date))
                : new Date();
        date = new Date(date.toISOString().slice(0, -1));

        const diffInMinutes = dateDiff(date, new Date());
        const communicationLoss = diffInMinutes !== undefined && diffInMinutes >= 15;
        const powermodulo = "0"

        realtimeData.forEach((data: any) => {
            if (data.assetType) {
                if (data.assetType === 'MBD1') {
                    assets[3].data = data.status
                        ? { ...data, communicationLoss: communicationLoss }
                        : { ...data, status: 'desativado' }; //MBD1
                } else if (data.assetType === 'MBD2') {
                    assets[4].data = data.status
                        ? { ...data, communicationLoss: communicationLoss }
                        : { ...data, status: 'desativado' }; //MBD2
                } else if (data.assetType === 'TRAT') {
                    assets[11].data = data.status
                        ? { ...data, communicationLoss: communicationLoss }
                        : { ...data, status: 'desativado' }; //TRAT
                }
            } else if (data.generator) {
                assets[1].data = data.generator.status
                    ? {
                          ...data.generator,
                          communicationLoss: communicationLoss,
                          powerModulo: powermodulo,
                      }
                    : { ...data.generator, status: 'desativado' }; //MGEL
                assets[0].data = data.floatPump.status
                    ? {
                          ...data.floatPump,
                          assetType: 'MBFL',
                          communicationLoss: communicationLoss,
                      }
                    : {
                          ...data.floatPump,
                          assetType: 'MBFL',
                          status: 'desativado',
                      }; //MBFL
                assets[2].data = data.hidrometer.status
                    ? {
                          ...data.hidrometer,
                          assetType: 'HIDR',
                          communicationLoss: communicationLoss,
                      }
                    : {
                          ...data.hidrometer,
                          assetType: 'HIDR',
                          status: 'desativado',
                      }; //HIDR
            } else if (data.carretel && data.carretel.assetType === 'CRT1') {
                assets[5].data = data.carretel.status
                    ? { ...data.carretel, communicationLoss: communicationLoss }
                    : { ...data.carretel, status: 'desativado' }; //CRT1
                assets[8].data = data.cannon.status
                    ? {
                          ...data.cannon,
                          assetType: 'CNH1',
                          communicationLoss: communicationLoss,
                      }
                    : {
                          ...data.cannon,
                          assetType: 'CNH1',
                          status: 'desativado',
                      }; //CNH1
            } else if (data.carretel && data.carretel.assetType === 'CRT2') {
                assets[6].data = data.carretel.status
                    ? { ...data.carretel, communicationLoss: communicationLoss }
                    : {
                          ...data.carretel,
                          status: 'desativado',
                          communicationLoss: communicationLoss,
                      }; //CRT2
                assets[9].data = data.cannon.status
                    ? {
                          ...data.cannon,
                          assetType: 'CNH2',
                          communicationLoss: communicationLoss,
                      }
                    : {
                          ...data.cannon,
                          assetType: 'CNH2',
                          status: 'desativado',
                          communicationLoss: communicationLoss,
                      }; //CNH2
            } else if (data.carretel && data.carretel.assetType === 'CRT3') {
                assets[7].data = data.carretel.status
                    ? { ...data.carretel, communicationLoss: communicationLoss }
                    : {
                          ...data.carretel,
                          status: 'desativado',
                          communicationLoss: communicationLoss,
                      }; //CRT3
                assets[10].data = data.cannon.status
                    ? {
                          ...data.cannon,
                          assetType: 'CNH3',
                          communicationLoss: communicationLoss,
                      }
                    : {
                          ...data.cannon,
                          assetType: 'CNH3',
                          status: 'desativado',
                          communicationLoss: communicationLoss,
                      }; //CNH3
            }
        });
        return assets;
    }
}
