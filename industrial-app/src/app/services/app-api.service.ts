import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth';
const access_token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnYXVzc2lhbnNvbHVjb2VzLmNvbS5iciIsImFwaSI6IlJBUFRfSU5TIiwiaWF0IjoxNTE2MjM5MDIyfQ.v97fMGXJm8-vZPNdxvqtqtjBRNMy1laRolX_fhnQRPY';

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
        return 'Bearer ' + this.auth.getToken();
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
