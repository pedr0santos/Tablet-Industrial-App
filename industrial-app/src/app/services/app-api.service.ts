import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth';
const access_token = '';

@Injectable({
    providedIn: 'root',
})
export class AppApiService {
    constructor(private auth: AuthService) {}

    public getHeaders() {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.auth.getToken(),
            }),
        };
    }

    public getAuthorization() {
        return 'Bearer ' + access_token;
    }

    public tokenAuth(value: string = access_token) {
        return {
            headers: {
                'x-access-token': value,
            },
        };
    }

    public geoMongo() {
        const username = 'developer_gaussian';
        const password = 'gauSSianGAUS';
        //const token = Buffer.from(`${username}:${password}`, 'utf8').toString('base64');
        const token = btoa(`${username}:${password}`);

        return {
            headers: {
                Authorization: `Basic ${token}`,
            },
        };
    }
}
