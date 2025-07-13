import { IonicModule } from '@ionic/angular';

import {
    Component,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges,
} from '@angular/core';
import { ConfigAtivosService } from '../../services/config-ativos.service';
import { MatDialog } from '@angular/material/dialog';
import { LabelStatusAssetsComponent } from './label-status-assets/label-status-assets.component';
import { IconAssetComponent } from './icon-asset/icon-asset.component';
import { GaugeAssetComponent } from './gauge-asset/gauge-asset.component';
import { DataAssetComponent } from './data-asset/data-asset.component';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-config-ativos',
    templateUrl: './config-ativos.component.html',
    styleUrls: ['./config-ativos.component.scss'],
    imports: [IonicModule,CommonModule, LabelStatusAssetsComponent, IconAssetComponent, GaugeAssetComponent, DataAssetComponent],
})
export class ConfigAtivosComponent implements OnInit, OnChanges {
    dataSource: any;
    PminCR1: string | undefined;
    statusGerador = false;

    @Input()
    modoHorizontal = false;

    @Input()
    dados: string | undefined;

    public ativos: any;
    hasCannonPressure: boolean | undefined;
    isManual = false;

    constructor(
        public dialog: MatDialog,
        private configAtivosService: ConfigAtivosService
    ) {}

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['dados']) {
            this.ativos = this.configAtivosService.getAssets(
                changes['dados'].currentValue
            );
            this.hasCannonPressure = this.hasCannonPressureGreaterThanZero();
        }
    }

    ngOnInit(): void {
        this.ativos = this.configAtivosService.getAssets(this.dados);
        this.hasCannonPressure = this.hasCannonPressureGreaterThanZero();
    }

    // testa se há pressão no canhão
    hasCannonPressureGreaterThanZero(): boolean {
        if (this.ativos) {
            for (const asset of this.ativos) {
                if (
                    asset.name == 'CNH1' ||
                    asset.name == 'CNH2' ||
                    (asset.name == 'CNH3' && parseFloat(asset.data.pressure) > 0)
                ) {
                    return true;
                }
            }
        }
        return false;
    }

    classMBFL() {
        if (
            this.ativos[0].data &&
            this.ativos[0].data?.status &&
            !this.ativos[0].data.communicationLoss
        ) {
            return this.ativos[0].data.status;
        }
        return '';
    }

    statusTextMBFL() {
        if (this.ativos[0].data && this.ativos[0].data?.status) {
            return this.ativos[0].data.status.replaceAll('_', ' ');
        }
        return 'Vazio';
    }

    classMGEL() {
        try{
            if(this.ativos[1].data.powerModulo &&
                 this.ativos[1].data.powerModulo === "1"){
                this.statusGerador = true;
                 }
        }catch(e){

        }

        if (
            this.ativos[1].data &&
            this.ativos[1].data?.status &&
            !this.ativos[1].data.communicationLoss
        ) {
            return this.ativos[1].data.status;

        }
        return '';
    }

    statusTextMGEL() {
        if (this.ativos[1].data && this.ativos[1].data?.status) {
            return this.ativos[1].data.status.replaceAll('_', ' ');
        }
        return 'Vazio';
    }

    classHIDR() {
        if (
            this.ativos[2].data &&
            this.ativos[2].data?.status &&
            !this.ativos[2].data.communicationLoss
        ) {
            return this.ativos[2].data.status;
        }
        return '';
    }

    statusTextHIDR() {
        if (this.ativos[2].data && this.ativos[2].data?.status) {
            return this.ativos[2].data.status.replaceAll('_', ' ');
        }
        return 'Vazio';
    }

    valueHIDR() {
        if (this.ativos[2].data && this.ativos[2].data?.value) {
            return String(Math.floor(Number(this.ativos[2].data.value)));
        }
        return '';
    }

    classMBD1() {
        let status = '';
        if (
            this.ativos[3].data &&
            this.ativos[3].data?.status &&
            !this.ativos[3].data.communicationLoss
        ) {
            status = this.ativos[3].data.status;
        }

        if (status != 'operando' && this.statusGerador) {
            this.isManual = true;
            return 'operando';
        }

        return status;
    }

    statusTextMBD1() {
        let status = 'Vazio';
        if (this.ativos[3].data && this.ativos[3].data?.status) {
            status = this.ativos[3].data.status.replaceAll('_', ' ');
        }

        if (status != 'operando' && this.statusGerador) {
            this.isManual = true;
            return 'operando';
        }

        return status;
    }

    classMBD2() {
        let status = '';
        if (
            this.ativos[4].data &&
            this.ativos[4].data?.status &&
            !this.ativos[4].data.communicationLoss
        ) {
            status = this.ativos[4].data.status;
        }

        if (this.ativos[4].data && status != 'operando' && this.statusGerador) {
            this.isManual = true;
            return 'operando';
        }

        return status;
    }

    statusTextMBD2() {
        let status = 'Vazio';
        if (this.ativos[4].data && this.ativos[4].data?.status) {
            status = this.ativos[4].data.status.replaceAll('_', ' ');
        }

        if (this.ativos[4].data && status != 'operando' && this.statusGerador) {
            this.isManual = true;
            return 'operando';
        }

        return status;
    }

    classCRT1() {
        if (
            this.ativos[5].data &&
            this.ativos[5].data?.status &&
            !this.ativos[5].data.communicationLoss
        ) {
            return this.ativos[5].data.status;
        }
        return '';
    }

    statusTextCRT1() {
        if (this.ativos[5].data && this.ativos[5].data?.status) {
            return this.ativos[5].data.status.replaceAll('_', ' ');
        }
        return 'Vazio';
    }

    classCRT2() {
        if (
            this.ativos[6].data &&
            this.ativos[6].data?.status &&
            !this.ativos[6].data.communicationLoss
        ) {
            return this.ativos[6].data.status;
        }
        return '';
    }

    statusTextCRT2() {
        if (this.ativos[6].data && this.ativos[6].data?.status) {
            return this.ativos[6].data.status.replaceAll('_', ' ');
        }
        return 'Vazio';
    }

    classCRT3() {
        if (
            this.ativos[7].data &&
            this.ativos[7].data?.status &&
            !this.ativos[7].data.communicationLoss
        ) {
            return this.ativos[7].data.status;
        }
        return '';
    }

    statusTextCRT3() {
        if (this.ativos[7].data && this.ativos[7].data?.status) {
            return this.ativos[7].data.status.replaceAll('_', ' ');
        }
        return 'Vazio';
    }

    classCNH1() {
        if (
            this.ativos[8].data &&
            this.ativos[8].data?.status &&
            !this.ativos[8].data.communicationLoss
        ) {
            return this.ativos[8].data.status;
        }
        return '';
    }

    statusTextCNH1() {
        if (this.ativos[8].data && this.ativos[8].data?.status) {
            return this.ativos[8].data.status.replaceAll('_', ' ');
        }
        return 'Vazio';
    }

    classCNH2() {
        if (
            this.ativos[9].data &&
            this.ativos[9].data?.status &&
            !this.ativos[9].data.communicationLoss
        ) {
            return this.ativos[9].data.status;
        }
        return '';
    }

    statusTextCNH2() {
        if (this.ativos[9].data && this.ativos[9].data?.status) {
            return this.ativos[9].data.status.replaceAll('_', ' ');
        }
        return 'Vazio';
    }

    classCNH3() {
        if (
            this.ativos[10].data &&
            this.ativos[10].data?.status &&
            !this.ativos[10].data.communicationLoss
        ) {
            return this.ativos[10].data.status;
        }
        return '';
    }

    statusTextCNH3() {
        if (this.ativos[10].data && this.ativos[10].data?.status) {
            return this.ativos[10].data.status.replaceAll('_', ' ');
        }
        return 'Vazio';
    }

    classTRAT() {
        if (
            this.ativos[11].data &&
            this.ativos[11].data?.status &&
            !this.ativos[11].data.communicationLoss
        ) {
            return this.ativos[11].data.status;
        }
        return '';
    }

    statusTextTRAT() {
        if (this.ativos[11].data && this.ativos[11].data?.status) {
            return this.ativos[11].data.status.replaceAll('_', ' ');
        }
        return 'Vazio';
    }
}
