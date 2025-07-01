import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';

@Injectable()
export class AuthService {

  mensagem: string | undefined;
  classeMsg: string | undefined;

  showLoginEmmiter = new EventEmitter<boolean>();
  showCadastroEmmiter = new EventEmitter<boolean>();
  userName = new EventEmitter<string>();
  showLoadingEmitter = new EventEmitter<boolean>();
  showSideBarTools = new EventEmitter<boolean>();
  showSideBarToolsView = new EventEmitter<boolean>();
  showBgLogin = new EventEmitter<string>();

  constructor(
    private router: Router,
  ) { }

  // Verificando se o usuário está logado
  async isUserLogged() {
    let sLogin: any = await Preferences.get({ key: "token" });
    sLogin = sLogin.value;
    this.showLoginEmmiter.emit(true);
    if (sLogin) {
      this.showLoginEmmiter.emit(false);
      // this.showCadastroEmmiter.emit(false);
      // this.userName.emit(sLogin.displayName);
      return true;
    }
    return false;
  }

  // Deslogando o Usuário
  logoutUser() {
    // this.showUrlMenuEmitter.emit(true);
    this.showLoginEmmiter.emit(true);
    // this.showLoadingEmitter.emit(false);
    // this.showBgLogin.emit('bg-login');
    Preferences.remove({ key: "token" });
    Preferences.remove({ key: "userRadCom" });
  }
}
