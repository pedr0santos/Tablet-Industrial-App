import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth';
const access_token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0MjFmNTllZS0wMDFmLTQ5N2MtYTI5Ni00NTc3NzlhNGIyNDUiLCJlbWFpbCI6InV2dC1jbWFhLnJhZGNvbUBvdXRsb29rLmNvbSIsInVzZXJuYW1lIjoidXZ0LWNtYWEucmFkY29tQG91dGxvb2suY29tIiwidmlzdWFsaXphdGlvbiI6ImNvbXBhbnlfYWRtaW4iLCJ0ZW1wb3JhcnlQYXNzd29yZCI6ZmFsc2UsIm9yaWdpbiI6IndlYiIsImlhdCI6MTc1MjQxMjQxNiwiZXhwIjoxNzUyNDk4ODE2fQ.7FKSaNeXBdB8sB-aNqKW8e7rKAZ8oYnrsN9UQeqDnIs';

@Injectable({
    providedIn: 'root',
})
export class AppApiService {
    constructor(private auth: AuthService) {}

    public getHeaders() {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0MjFmNTllZS0wMDFmLTQ5N2MtYTI5Ni00NTc3NzlhNGIyNDUiLCJlbWFpbCI6InV2dC1jbWFhLnJhZGNvbUBvdXRsb29rLmNvbSIsInVzZXJuYW1lIjoidXZ0LWNtYWEucmFkY29tQG91dGxvb2suY29tIiwidmlzdWFsaXphdGlvbiI6ImNvbXBhbnlfYWRtaW4iLCJ0ZW1wb3JhcnlQYXNzd29yZCI6ZmFsc2UsIm9yaWdpbiI6IndlYiIsImlhdCI6MTc1MjQxMjQxNiwiZXhwIjoxNzUyNDk4ODE2fQ.7FKSaNeXBdB8sB-aNqKW8e7rKAZ8oYnrsN9UQeqDnIs',
            }),
        };
    }

    public getAuthorization() {
        return 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0MjFmNTllZS0wMDFmLTQ5N2MtYTI5Ni00NTc3NzlhNGIyNDUiLCJlbWFpbCI6InV2dC1jbWFhLnJhZGNvbUBvdXRsb29rLmNvbSIsInVzZXJuYW1lIjoidXZ0LWNtYWEucmFkY29tQG91dGxvb2suY29tIiwidmlzdWFsaXphdGlvbiI6ImNvbXBhbnlfYWRtaW4iLCJ0ZW1wb3JhcnlQYXNzd29yZCI6ZmFsc2UsIm9yaWdpbiI6IndlYiIsImlhdCI6MTc1MjQxMjQxNiwiZXhwIjoxNzUyNDk4ODE2fQ.7FKSaNeXBdB8sB-aNqKW8e7rKAZ8oYnrsN9UQeqDnIs';
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
