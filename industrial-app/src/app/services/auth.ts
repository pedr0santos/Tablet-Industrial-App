import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Preferences } from '@capacitor/preferences';
// import { ViewIndustryService } from '../modules/platform/pages/view-industry/view-industry.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public loggedIn = new BehaviorSubject<string | null>(null);
  public loggedOut = new BehaviorSubject<boolean | null>(null);
  public refreshTokenInProgress = false;

  private readonly TOKEN = 'token';
  private readonly VISUALIZATION = 'visualization';
  private readonly EMAIL = 'email';
  private readonly IDUSER = 'user';
  private readonly CHANGEDPASSWORD = 'changedPassword';

  constructor(
    private router: Router,
    // private viewIndustryService: ViewIndustryService
  ) {}

  /**
   * Realiza o login do usuário
   */
  public async login(
    token: string,
    visualization: string,
    email: string,
    user: string
  ): Promise<void> {
    await Preferences.set({ key: this.TOKEN, value: token });
    await Preferences.set({ key: this.VISUALIZATION, value: visualization });
    await Preferences.set({ key: this.EMAIL, value: email });
    await Preferences.set({ key: this.IDUSER, value: user });

    this.loggedIn.next(token);
  }

  /**
   * Realiza o logout do usuário
   */
  public async logout(): Promise<void> {
    await Preferences.clear(); // remove tudo
    // this.viewIndustryService.setDataViewIndustry([]);
    this.loggedOut.next(true);
    await this.router.navigate(['/'], { replaceUrl: true });
  }

  /**
   * Recupera o token de autenticação
   */
  public async getToken(): Promise<string | null> {
    const { value } = await Preferences.get({ key: this.TOKEN });
    return value;
  }

  /**
   * Recupera a visualization
   */
  public async getVisualization(): Promise<string | null> {
    const { value } = await Preferences.get({ key: this.VISUALIZATION });
    return value;
  }

  /**
   * Verifica se o usuário está autenticado
   */
  public async isAuthenticated(): Promise<boolean> {
    const tokenResult = await Preferences.get({ key: this.TOKEN });
    const changedPasswordResult = await Preferences.get({
      key: this.CHANGEDPASSWORD,
    });

    return (
      changedPasswordResult.value === 'true' && tokenResult.value != null
    );
  }
}
