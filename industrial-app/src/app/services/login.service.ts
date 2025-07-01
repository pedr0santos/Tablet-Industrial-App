import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  constructor(
    private http: HttpClient
  ) { }

  login(body: any): Promise<any> {
    console.log("body login: ",body);
    return new Promise((resolve, reject) => {
      this.http.post(
        BASE_URL + '/login',
        body
      ).subscribe(res => {
        console.log("res login: ",res);
        resolve(res);
      }, err => {
        reject(err);
      });
    });
  }

  getUserById(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(
        `${BASE_URL}/user/${id}`
      ).subscribe(res => {
        console.log("res login getUserById: ",res);
        resolve(res);
      }, err => {
        reject(err);
      });
    });
  }

  getUserByToken(token: string): Promise<any> {
    // TODO: Confirmar implementação
    return new Promise((resolve, reject) => {
      this.http.get(
        `${BASE_URL}/user/${token}`
      ).subscribe(res => {
        resolve(res);
      }, err => {
        resolve(err);
      });
    });
  }

  changePassword(id: string, body: any) {
    return this.http.put(`${BASE_URL}/user/${id}`, body);
  }

}
