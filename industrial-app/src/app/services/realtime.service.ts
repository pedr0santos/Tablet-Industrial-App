import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BASE_URL } from 'src/environments/environment';
import { IGetRealtimeData } from '../interfaces/realtime';


@Injectable({
  providedIn: 'root',
})
export class RealtimeService {
  constructor(private http: HttpClient) {}

  getRealtimeData(body: IGetRealtimeData): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(`${BASE_URL}/realtime-data`, body).subscribe(
        (res) => {
          resolve(res);
        },
        (err) => {
          resolve(err);
        }
      );
    });
  }

  getLastRealTime(idProject: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http
        .get(`${BASE_URL}/monitoring-reports/lastUpdate/${idProject}`)
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err) => {
            resolve(err);
          }
        );
    });
  }
  // /monitoring-reports/lastUpdate/:PROJECTID

    getProjectAssets(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http
        .get(`${BASE_URL}/asset-groupList/${id}`)
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err) => {
            resolve(err);
          }
        );
    });
  }

    updateFuelMin(
    projectId: string,
    body: {
      idMtb1: string;
      fuelMinMtb1: number;
      idMtb2: string;
      fuelMinMtb2: number;
    }): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http
        .put(`${BASE_URL}/asset-groupUpdateFuelMin/${projectId}`,body)
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err) => {
            resolve(err);
          }
        );
    });
  }
}
