import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ConfigAtivosService } from 'src/app/services/config-ativos.service';
// import { DataSourceTableUsersService } from 'src/app/modules/platform/services/data-source-table-users.service';
// import { DataSourceTableOrdersService } from 'src/app/modules/platform/services/data-source-table-orders.service';
// import { DataSourceTableAlertsService } from 'src/app/modules/platform/services/data-source-table-alerts.service';
// import { StorageService } from 'src/app/services/storage';
// import { MonitoringService } from 'src/app/modules/platform/services/monitoring.service';
// import { ModalComponent } from 'src/app/components/modal/modal.component';
import { ViewIndustryService } from '../../services/view-industry.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { RealtimeService } from 'src/app/services/realtime.service';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { MonitoringService } from 'src/app/services/monitoring.service';
import { Preferences } from '@capacitor/preferences';
import { ConfigAtivosComponent } from 'src/app/components/config-ativos/config-ativos.component';
import { OverlayedLoadingComponent } from 'src/app/components/overlayed-loading/overlayed-loading.component';

@Component({
  selector: 'app-view-industry',
  templateUrl: './view-industry.page.html',
  styleUrls: ['./view-industry.page.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    ConfigAtivosComponent,
    OverlayedLoadingComponent
  ],
})
export class ViewIndustryPage implements OnInit, OnDestroy {
  dataAtivos: any = [];
  dados: any = [];
  unitID: string | undefined;
  projects: any;
  interval: any;
  isLoading: boolean | undefined;
  selectedProjectId: string | null = null;

  constructor(
    // public storage: StorageService,
    // public dataSourceTableUsersService: DataSourceTableUsersService,
    // public dataSourceTableOrdersService: DataSourceTableOrdersService,
    // public dataSourceTableAlertsService: DataSourceTableAlertsService,
    public configAtivosService: ConfigAtivosService,
    public monitoringService: MonitoringService,
    private dialog: MatDialog,
    private realtimeService: RealtimeService,
    private viewIndustryService: ViewIndustryService,
    private router: Router
  ) {}

  async ngOnInit() {
    this.unitID =
        (await Preferences.get({ key: 'unidadeId' })).value ?? undefined;
        this.unitID = 'b950105c-7db2-4f8f-a242-b7e519e02013';
    this.isLoading = !this.viewIndustryService.hasDataLoaded();
    this.dados = this.viewIndustryService.getDataViewIndustry();
    await this.loadProjects();
  }

  @HostListener('window:beforeunload')
  ngOnDestroy() {
    clearInterval(this.interval);
  }

  async loadProjects() {
    try {


      if(!this.unitID) return;
      const projects = await this.monitoringService.getProjects(this.unitID);
      // console.log('PROJECTS ->', projects);
      if (!projects) {
        this.openModalError(
          'Cadastre um projeto para visualizar a sua Visão Industrial!'
        );
        this.isLoading = false;
      } else {
        this.projects = projects;
        // this.interval = setInterval(() => {
          this.loadAssets();
        // }, 20000);
      }
    } catch (e) {
      console.log(e);
    }
  }

  async loadAssets() {
    await this.projects.forEach(async (project: any, index: any) => {
      try {
        const lastRealTime = await this.realtimeService.getLastRealTime(
          project.item.id
        );
        // console.log('LASTREALTIME ->', lastRealTime);
        if (lastRealTime !== undefined && lastRealTime !== null) {
          project.item.lastRealTime = lastRealTime.project.lastRealTime;
        }
        let pjAssetsId = [];
        const pjAssets = await this.realtimeService.getProjectAssets(
          project.item.id
        );
        // console.log('PJASSETS ->', pjAssets);
        pjAssetsId = pjAssets?.map((asset: any) => asset.id);
        // console.log('PJASSETSID ->', pjAssetsId);

        let realtimeData = null;
        if (pjAssetsId) {
          realtimeData = await this.realtimeService.getRealtimeData({
            projectId: project.item.id,
            assets: pjAssetsId,
          });
          // console.log('REALTIMEDATA ->', realtimeData);
        }

        const d = {
          project: project,
          assets: realtimeData || [],
        };
        this.dados[index] = d;
      } catch (e) {
        const d = {
          project: project,
          assets: [],
        };
        this.dados[index] = d;
      }
    });
    this.viewIndustryService.setDataViewIndustry(this.dados);
    this.isLoading = false;
  }

  selectProject(projectId: string) {
    this.selectedProjectId = projectId;
  }

  openModalError(message: string) {
    this.dialog.open(ModalComponent, {
      width: '370px',
      data: {
        icon: 'assets/icons/error-icon.svg',
        title: 'Algo deu errado',
        text: message,
        hasButton: true,
        isConfirmationModal: true,
      },
    });
  }

  goToAlertHandling(id: any) {
    this.router.navigate(['platform/monitoring/', id, 'alert-handling']);
  }
}
