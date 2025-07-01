import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppApiService } from 'src/app/services/app-api.service';
import { BASE_URL } from 'src/environments/environment';


@Injectable({
    providedIn: 'root',
})
export class AccountService {
    constructor(private http: HttpClient, private appApi: AppApiService) {}

    public login(username: string, password: string): Observable<any> {
        return this.http.post<any>(`${BASE_URL}/login`, { username, password });
    }

    public async user(userId: string): Promise<any> {
        return this.http
            .get<any>(`${BASE_URL}/user/${userId}`, this.appApi.getHeaders())
            .toPromise();
    }

    public async unit(unitId: string): Promise<any> {
        return this.http
            .get<any>(`${BASE_URL}/unit/${unitId}`, this.appApi.getHeaders())
            .toPromise();
    }

    public forgotPass(username: string): Observable<any> {
        return this.http.post<any>(`${BASE_URL}/password/forgot`, { username });
    }

    public resetPass(resetToken: string, newPassword: string): Observable<any> {
        return this.http.put<any>(`${BASE_URL}/password/reset`, {
            resetToken,
            newPassword,
        });
    }

    public updatePassword(id: string, password: string) {
        const body = {
            password,
        };

        return this.http
            .put<any>(`${BASE_URL}/user/${id}`, body, this.appApi.getHeaders())
            .toPromise();
    }
}
