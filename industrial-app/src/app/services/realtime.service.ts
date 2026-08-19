import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IGetRealtimeData } from '../interfaces/realtime';
import { AppApiService } from './app-api.service'; // ajuste se o nome for outro
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RealtimeService {
  constructor(
    private http: HttpClient,
    private appApi: AppApiService
  ) {}

  async getRealtimeData(body: IGetRealtimeData): Promise<any> {
    return this.http
      .post(`${environment.BASE_URL}/realtime-data`, body, await this.appApi.getHeaders())
      .toPromise();
  }

  async getLastRealTime(idProject: string): Promise<any> {
    return this.http
      .get(`${environment.BASE_URL}/monitoring-reports/lastUpdate/${idProject}`, await this.appApi.getHeaders())
      .toPromise();
  }

  async getProjectAssets(id: string): Promise<any> {
    return this.http
      .get(`${environment.BASE_URL}/asset-groupList/${id}`, await this.appApi.getHeaders())
      .toPromise();
  }

  async updateFuelMin(
    projectId: string,
    body: {
      idMtb1: string;
      fuelMinMtb1: number;
      idMtb2: string;
      fuelMinMtb2: number;
    }
  ): Promise<any> {
    return this.http
      .put(`${environment.BASE_URL}/asset-groupUpdateFuelMin/${projectId}`, body, await this.appApi.getHeaders())
      .toPromise();
  }
}
