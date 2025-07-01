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
                Authorization: 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0MGMwNmVmZC1hNTRhLTRhMDMtODJiOC0yYTdkNDkyMTVmZjciLCJlbWFpbCI6InJhZGNvbWhvbWVAdW9yYWsuY29tIiwidXNlcm5hbWUiOiJSREgxMDAxNzEiLCJ2aXN1YWxpemF0aW9uIjoiY29tcGFueV9hZG1pbiIsInRlbXBvcmFyeVBhc3N3b3JkIjpmYWxzZSwib3JpZ2luIjoid2ViIiwiaWF0IjoxNzUxMzQ5OTAzLCJleHAiOjE3NTE0MzYzMDN9.Hgw5FsWdsm77BS9xDfonotdcNCVPbpoJMWAkpyl6DNI',
            }),
        };
    }

    public getAuthorization() {
        return 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0MGMwNmVmZC1hNTRhLTRhMDMtODJiOC0yYTdkNDkyMTVmZjciLCJlbWFpbCI6InJhZGNvbWhvbWVAdW9yYWsuY29tIiwidXNlcm5hbWUiOiJSREgxMDAxNzEiLCJ2aXN1YWxpemF0aW9uIjoiY29tcGFueV9hZG1pbiIsInRlbXBvcmFyeVBhc3N3b3JkIjpmYWxzZSwib3JpZ2luIjoid2ViIiwiaWF0IjoxNzUxMzQ5OTAzLCJleHAiOjE3NTE0MzYzMDN9.Hgw5FsWdsm77BS9xDfonotdcNCVPbpoJMWAkpyl6DNI';
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
