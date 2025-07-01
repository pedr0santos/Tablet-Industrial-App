import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule, LoadingController, ToastController } from '@ionic/angular';
import { LoginService } from 'src/app/services/login.service';
import { Preferences } from '@capacitor/preferences';
import { Router } from '@angular/router';
// import { DatabaseService } from 'src/app/database/database.service';
import { Network } from '@awesome-cordova-plugins/network/ngx';
import { USER_SECRET } from 'src/environments/environment';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    ReactiveFormsModule,
  ]
})
export class LoginPage implements OnInit {
  formLogin: FormGroup<any> = new FormGroup({});
  showPassword = false;
  hiddenSenha = false;
  typePass = 'password';
  storageUserRadCom: any;
  dataUserRadCom: any;
  typeLogin: any;
  token: any;
  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private router: Router,
    // private dbService: DatabaseService,
    private network: Network
  ) { }

  async ionViewDidEnter() {
    this.createForm();

    //pegar o token (se estiver vazio ainda n fez nenhum login)
    this.token = await Preferences.get({ key: 'token' });
    console.log("token: ",this.token);
    if(this.token.value !== null){
      return
    }
    this.checkConection();
  }

  createForm() {
    this.formLogin = this.fb.group({
      username: ['', Validators.required],
      password: [USER_SECRET],
    });
  }

  async ngOnInit() {
    var teste = navigator.onLine;
    console.log('NAVIGATOR: ', teste);

    this.createForm();

    //pegar o token (se estiver vazio ainda n fez nenhum login)
    this.token = await Preferences.get({ key: 'token' });

    this.checkConection();
  }

  async checkConection() {
    //pegar qual a conexão do usuáriooo
    console.log(this.network);
    var networkState = this.network.type;

    if (
      networkState !== this.network.Connection.NONE &&
      this.token.value !== null
    ) {
      //confere se tem conexão e se existe um token (ENTRAR SEM PRECISAR DE LOGIN, POIS JÁ TEM O TOKEN)

      this.typeLogin = 'on'; //define o tipo de login para ONLINE
      this.loginNoCredential(); //chama a função que muda para o login sem email e senha (APENAS ENTRAR)
    } else if (
      networkState === this.network.Connection.NONE &&
      this.token.value !== null
    ) {
      //confere se não tem conexão e se existe um token (LOGIN OFFLINE)

      this.typeLogin = 'off'; //define o tipo de login para OFFLINE
      this.loginNoCredential(); //chama a função que muda para o login sem email e senha (APENAS ENTRAR)
    } else if (
      networkState === this.network.Connection.NONE &&
      this.token.value === null
    ) {
      //confere se não tem conexão e se existe um token ()
      this.toastDefault(
        'Necessário conexão à internet para fazer o primeiro login',
        3500
      );
    } else if (
      networkState !== this.network.Connection.NONE &&
      this.token.value === null
    ) {
      //confere se tem conexão e se existe um token (PRIMEIRO LOGIN, NECESSARIO EMAIL E SENHA POIS N TEM O TOKEN)
      this.typeLogin = 'on';
      this.loginNoCredential();
    }
  }

  toggleShow() {
    this.showPassword = !this.showPassword;
    this.typePass = this.showPassword ? 'text' : 'password';
  }

  async loginNoCredential() {
    //configurar a tela de login para realizar login sem digitar as credenciais pois já tem um token salvo

    this.storageUserRadCom = await Preferences.get({ key: 'userRadCom' }); //recebe os dados que estão salvos em storage
    this.dataUserRadCom = JSON.parse(this.storageUserRadCom.value);

    if (this.dataUserRadCom && this.formLogin) {
      this.formLogin.setValue({
        //define o email que vai aparecer
        username: this.dataUserRadCom.username,
        password: USER_SECRET,
      });
      this.hiddenSenha = true; //esconde o campo de digitar a senha
    } else {
      // this.toastDefault('Não foi possível carregar dados de login',3500)
      this.hiddenSenha = false;
    }
  }
  async login() {
    const load = await this.loadingCtrl.create();
    await load.present();

    if (this.typeLogin === 'on' && this.token.value !== null) {
      //confere o tipo de login e se tem token

      //   this.dbService.clearLines();
      //   this.dbService.clearProjectPut();
      //   this.dbService.clearTrative();
      //   this.dbService.clearProjects();

      this.storageUserRadCom = await Preferences.get({ key: 'userRadCom' });
      this.dataUserRadCom = JSON.parse(this.storageUserRadCom.value);

      console.log(this.dataUserRadCom);
      await this.getUser(this.dataUserRadCom.id);
      await load.dismiss();

      this.router.navigateByUrl(`view-industry`);
    } else if (this.typeLogin === 'on' && this.token.value === null) {


      await Preferences.remove({ key: 'token' });
      await Preferences.remove({ key: 'farms' });

      if(this.formLogin)
      this.loginService
        .login(this.formLogin.value)
        .then(async (res: any) => {

          console.log('%clogin.page.ts line:161 res', 'color: white; background-color: #007acc;', JSON.stringify(res));


          await Preferences.set({
            key: 'token',
            value: res.token,
          });

          await Preferences.set({
            key: 'userId',
            value: JSON.stringify(res.userId),
          });

          // //db
          // this.dbService.clearLines();
          // this.dbService.clearProjectPut();
          // this.dbService.clearTrative();
          // this.dbService.clearProjects();

          console.log("TOKEN",res.token);

          await this.getUser(res.userId);
          this.router.navigateByUrl(`view-industry`);

          this.checkFirstLogin(res);

          await load.dismiss();

          this.router.navigateByUrl(`view-industry`);
        })
        .catch(async (err) => {
          console.log('ERR', err);
          await load.dismiss();

          const toast = await this.toastCtrl.create({
            message: err.status == 401 ? 'Acesso não autorizado' : 'Ocorreu um erro, tente novamente',
            duration: 5000,
          });
          toast.present();
        });
    } else if (this.typeLogin === 'off' && this.token.value !== null) {
      await load.dismiss();
     this.router.navigateByUrl(`view-industry`);
    }

    //Sem internet
  }

  async getUser(userid: any) {
    this.loginService
      .getUserById(userid)
      .then(async (res: any) => {
        console.log('RES DETAILS', res);
        await Preferences.set({
          key: 'unidadeId',
          value: JSON.stringify(res.unit),
        });
      })
      .catch(async (err) => {
        console.log('ERR', err);
      });
  }

  async checkFirstLogin(res: any){
    console.log('%clogin.page.ts line:213 res irts login', 'color: white; background-color: #007acc;', res);
    if(res.temporaryPassword){
      this.router.navigateByUrl(`new-password`);
    }else{
      await this.getUser(res.userId);
      this.router.navigateByUrl(`view-industry`);
    }
  }

  async tryTokenLogin() {
    const token = await Preferences.get({ key: 'token' });

    if(token.value)
    this.loginService
      .getUserByToken(token.value )
      .then(async (res: any) => {
        await Preferences.set({
          key: 'userRadCom',
          value: JSON.stringify(res),
        });
        this.router.navigateByUrl(`view-industry`);
      })
      .catch(async (err) => {
        console.log('ERR', err);
      });
  }

  async toastDefault(msg: string, tempo: number) {
    const toasConnection = await this.toastCtrl.create({
      message: msg,
      duration: tempo,
      position: 'bottom',
    });

    toasConnection.present();
  }
}
