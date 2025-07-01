import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs';
import { AppApiService } from './app-api.service';
import { BASE_URL } from 'src/environments/environment';

//const urlPins = 'http://gaussiantec.com.br:3000';
//const urlPins = 'http://localhost:3000';

@Injectable({ providedIn: 'root' })
export class MonitoringService {
    constructor(private http: HttpClient, private appApi: AppApiService) {}

    // enviar form data
    // type - kmz ou shape
    public async uploadGeo(
        farmId: any,
        companyId: any,
        unitId: any,
        projectId: any,
        file: any
    ): Promise<any> {
        const type = 'kmz';
        const formData: FormData = new FormData();
        formData.append('type', type);
        formData.append('farmId', farmId);
        formData.append('companyId', companyId);
        formData.append('unitId', unitId);
        formData.append('projectId', projectId);
        formData.append('file', file);

        const httpOptions = {
            headers: new HttpHeaders({
                processData: 'false',
                mimeType: 'multipart/form-data',
                Authorization: this.appApi.getAuthorization(),
                //responseType: 'text'
            }),
        };

        return this.http
            .post<any>(`${BASE_URL}/upload-geo`, formData, httpOptions)
            .toPromise();
    }

    // id da geolocalização
    // pega as linhas de irrigação
    //primeiro lng, segundo lat
    public async getGeoLocation(id: string): Promise<any> {
        return this.http
            .get<any>(`${BASE_URL}/geolocation/${id}`, this.appApi.getHeaders())
            .toPromise();
    }

    public async getGeoLocationByFarm(farmId: string): Promise<any> {
        return this.http
            .get<any>(
                `${BASE_URL}/geolocation/farm/${farmId}`,
                this.appApi.getHeaders()
            )
            .toPromise();
    }

    public async getGeoLocationList(id: string): Promise<any> {
        return this.http
            .get<any>(
                `${BASE_URL}/geolocation/unit/${id}`,
                this.appApi.getHeaders()
            )
            .toPromise();
    }

    public async getProjects(unitId: string): Promise<any> {
        return this.http
            .get<any>(
                `${BASE_URL}/unit/${unitId}/projectList`,
                this.appApi.getHeaders()
            )
            .toPromise();
    }

    public async getProject(id: string): Promise<any> {
        return this.http
            .get<any>(`${BASE_URL}/project/${id}`, this.appApi.getHeaders())
            .toPromise();
    }

    public async getIrrigationLines(id: string): Promise<any> {
        return this.http
            .get<any>(
                `${BASE_URL}/farm/irrigation-lines/${id}`,
                this.appApi.getHeaders()
            )
            .toPromise();
    }

    //{{localhost}}/spool-reports/:projectId/:spoolId/:genId?startDate=2023-02-16 01:00:00&endDate=2023-02-16
    public async getMonitoringReportByProjectAndSpool(
        projectId: string,
        spoolId: string,
        genId: string,
        start: string,
        end: string
    ): Promise<any> {
        let queryParams = new HttpParams();
        queryParams = queryParams.append('startDate', start);
        queryParams = queryParams.append('endDate', end);
        return this.http
            .get<any>(
                `${BASE_URL}/spool-reports/${projectId}/${spoolId}/${genId}`,
                { params: queryParams }
            )
            .toPromise();
    }
    //{{localhost}}/project-reports/:projectId/:genId?startDate=2023-02-16 01:00:00&endDate=2023-02-16 09:00:00
    public async getMonitoringReportByProjectAndGen(
        projectId: string,
        genId: string,
        start: string,
        end: string
    ): Promise<any> {
        let queryParams = new HttpParams();
        queryParams = queryParams.append('startDate', start);
        queryParams = queryParams.append('endDate', end);
        return this.http
            .get<any>(`${BASE_URL}/project-reports/${projectId}/${genId}`, {
                params: queryParams,
            })
            .toPromise();
    }
    //{{localhost}}/motor-reports/:projectId/:spoolId/:genId/:motorId?startDate=2023-02-16 01:00:00&endDate=2023-02-16 09:00:00
    public async getMonitoringReportByProjectAndMotor(
        projectId: string,
        spoolId: string,
        genId: string,
        motorId: string,
        start: string,
        end: string
    ): Promise<any> {
        let queryParams = new HttpParams();
        queryParams = queryParams.append('startDate', start);
        queryParams = queryParams.append('endDate', end);
        return this.http
            .get<any>(
                `${BASE_URL}/motor-reports/${projectId}/${spoolId}/${genId}/${motorId}`,
                { params: queryParams }
            )
            .toPromise();
    }

    public async getMonitoringReportByProjectAndTelemetric(
        projectId: string,
        spoolId: string,
        type: string,
        start: string,
        end: string,
        sendToPins: boolean
    ): Promise<any> {
        let queryParams = new HttpParams();
        queryParams = queryParams.append('startDate', start);
        queryParams = queryParams.append('endDate', end);
        queryParams = queryParams.append('sendToPins', sendToPins);
        console.log(queryParams)
        if (type === 'MBD1' || type === 'MBD2') {
            return this.http
                .get<any>(
                    `${BASE_URL}/tele-motor-reports/${projectId}/${spoolId}`,
                    {
                        params: queryParams,
                    }
                )
                .toPromise();
        } else {
            return this.http
                .get<any>(`${BASE_URL}/tele-reports/${projectId}/${spoolId}`, {
                    params: queryParams,
                })
                .toPromise();
        }
    }

    public async insights(
        projectId: string,
        start: string,
        end: string
    ): Promise<any> {
        let queryParams = new HttpParams();
        queryParams = queryParams.append('startDate', start);
        queryParams = queryParams.append('endDate', end);
        return this.http
            .get<any>(`${BASE_URL}/insights/${projectId}`, {
                params: queryParams,
            })
            .toPromise();
    }

    public async getMonitoringReportByProject(
        projectId: string,
        start: string,
        end: string
    ): Promise<any> {
        const body = {
            projectId,
            start,
            end,
        };
        return this.http
            .post<any>(
                `${BASE_URL}/monitoring-reports/project`,
                body,
                this.appApi.getHeaders()
            )
            .toPromise();
    }

    public async getMonitoringReportBySpool(
        //spool == carretel
        projectId: string,
        spool: string,
        start: string,
        end: string
    ): Promise<any> {
        const body = {
            projectId,
            spool, // CRT1 , CRT2, CRT3
            start,
            end,
        };
        return this.http
            .post<any>(
                `${BASE_URL}/monitoring-reports/spool`,
                body,
                this.appApi.getHeaders()
            )
            .toPromise();
    }

    public async getMonitoringReportByMachine(
        //spool == carretel
        projectId: string,
        machine: string,
        start: string,
        end: string
    ): Promise<any> {
        const body = {
            projectId,
            machine,
            start,
            end,
        };
        return this.http
            .post<any>(
                `${BASE_URL}/monitoring-reports/machine`,
                body,
                this.appApi.getHeaders()
            )
            .toPromise();
    }

    public async getAssetGPS(projectId: string) {
        return this.http
            .get<any>(
                `${BASE_URL}/realTimeAssetLastGPS/${projectId}`,
                this.appApi.getHeaders()
            )
            .toPromise();
    }

    public async getProjectGPS(projectId: string) {
        return this.http
            .get<any>(
                `${BASE_URL}/realTimeAssetProjectGPS/${projectId}`,
                this.appApi.getHeaders()
            )
            .toPromise();
    }

    public async getMonitoringReportProjectMap(projectId: string) {
        return this.http
            .get<any>(
                `${BASE_URL}/monitoring-reports/projectMap/${projectId}`,
                this.appApi.getHeaders()
            )
            .toPromise();
    }

    public async getMonitoringReportProjectMapAbas(projectId: string) {
        return this.http
            .get<any>(
                `${BASE_URL}/monitoring-shifts-project/${projectId}`,
                this.appApi.getHeaders()
            )
            .toPromise();
    }

    public async getCannonTraces(projectId: string) {
        return this.http
            .get<any>(
                `${BASE_URL}/monitoring-cannon-traces/list-today/${projectId}`,
                this.appApi.getHeaders()
            )
            .toPromise();
    }

    public async getCannonTracesWithInterval(projectId: string, dateStart: string, dateEnd: string) {
        return await this.http
            .get<any>(
                `${BASE_URL}/monitoring-cannon-traces/list/${projectId}/${dateStart} 00:00:00/${dateEnd} 23:59:59`,
                this.appApi.getHeaders()
            )
            .toPromise();
    }
    // --------------------------------------------------------------------------------------------------------

    public async getFarm(lat: number, long: number) {
        const username = 'developer_gaussian';
        const password = 'gauSSianGAUS';
        //const token = Buffer.from(`${username}:${password}`, 'utf8').toString('base64');
        //let token = btoa(`${username}:${password}`);

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Basic ' + btoa(`${username}:${password}`),
            }),
        };

        //return await this.http.get<any>(`http://gaussiantec.com.br:5050/find_polygon?latitude=${lat}&longitude=${long}`,
        //httpOptions).toPromise();
        return await this.http
            .get<any>(
                `http://gaussiantec.com.br:5050/find_polygon?latitude=${lat}&longitude=${long}`,
                this.appApi.geoMongo()
            )
            .toPromise();
    }

    public async getbolletimIns(pimsUrl: string, accessToken: string) {
        return this.http
            .get<any>(
                `${pimsUrl}/api/v1/ins/`,
                this.appApi.tokenAuth(accessToken)
            )
            .toPromise();
    }

    public async getbolletimMec(pimsUrl: string, accessToken: string) {
        return this.http
            .get<any>(
                `${pimsUrl}/api/v1/mec/`,
                this.appApi.tokenAuth(accessToken)
            )
            .toPromise();
    }

    public async getEquipMec(
        equip: string,
        pimsUrl: string,
        accessToken: string
    ) {
        //let equipId = parseInt(equip);
        return this.http
            .get<any>(
                `${pimsUrl}/api/v1/mec/equip/${equip}`,
                this.appApi.tokenAuth(accessToken)
            )
            .toPromise();
    }

    /*public submitIn(payload) {

        console.log('centro de custo -> ' + payload.costCenterCode);
        console.log(payload);

        return this.http
            .post<any>(`${url}/in`, { payload })
            .pipe(map(res => res))
            .toPromise();
    }*/

    public async submitIn(payload: any, pimsUrl: string, accessToken: string) {
        console.log('submitIn: ', payload);
        const success = await this.http
            .post<any>(
                `${pimsUrl}/api/v1/ins`,
                payload,
                this.appApi.tokenAuth(accessToken)
            )
            .toPromise();
        console.log('Sucesso? ', success);
        return success;
    }

    /*public submitMec(payload) {
        return this.http
            .post<any>(`${url}/mec`, { payload })
            .pipe(map(res => res))
            .toPromise();
    }*/

    public async submitMec(payload: any, pimsUrl: string, accessToken: string) {
        console.log('submitMec: ', payload);
        const success = await this.http
            .post<any>(
                `${pimsUrl}/api/v1/mec`,
                payload,
                this.appApi.tokenAuth(accessToken)
            )
            .toPromise();
        console.log('Mac Sucess?', success);
        return success;
    }
}
