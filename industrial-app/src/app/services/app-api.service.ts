import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth';

@Injectable({
    providedIn: 'root',
})
export class AppApiService {
    constructor(private auth: AuthService) {}

    public async getHeaders() {
        const token = await this.auth.getToken();

        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
            }),
        };
    }

    public async getAuthorization() {
        const token = await this.auth.getToken();
        return token ? `Bearer ${token}` : '';
    }

    public tokenAuth(value: string) {
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
