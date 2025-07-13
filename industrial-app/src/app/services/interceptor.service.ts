import {
  HttpClient,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { from, Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Preferences } from '@capacitor/preferences';
import { captureRejectionSymbol } from 'events';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class InterceptorService implements HttpInterceptor {
  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  async getToken() {
    let response: any = await Preferences.get({ key: 'token' });
    return response.value ? response.value : '';
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return from(this.getToken()).pipe(
      switchMap((token: string) => {
        if (token !== null) {
          if (
            !request.url.includes('func') &&
            !request.url.includes('data') &&
            !request.url.includes('validacao') &&
            !request.url.includes('param')
          ) {
            request = request.clone({
              headers: new HttpHeaders({
                'Content-Type': 'application/json; charset=utf-8',
                Accept: 'application/json',
                Authorization: `Bearer ${token}`,
              }),
            });
          }
        }

        return next.handle(request);
      }),
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          const isNotAuthenticate = err.status === 401 && err.error.message === 'Sessão expirada!';

          if (isNotAuthenticate) {
            return throwError(this.handle401Error(request, next));
          } else {
            return throwError(err);
          }
        } else {
          return throwError(new Error('An unknown error occurred'));
        }
      })
    );
  }

  //TODO: Método ainda não finalizado. Aguardando rota de refreshToken estiver pronta
  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    Preferences.remove({ key: 'token' });
    this.authService.showLoginEmmiter.emit(true);
    this.router.navigate(['/login']);

    return;
    //TODO: Utilizar refresh token do storage
    const refreshToken = '';

    //TODO: Fazer alteração de acordo com a API quando estiver pronta
    return this.http.post(environment.BASE_URL + '/refreshToken', { refreshToken }).pipe(
      switchMap((res: any) => {
        //TODO: Utilizar resposta da API para o novo token
        const newToken = res.token;

        request = request.clone({
          setParams: {
            newToken,
          },
        });

        return next.handle(request);
      })
    );
  }
}
