import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth';
import { BehaviorSubject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ViewIndustryService } from 'src/app/services/view-industry.service';
import { StorageService } from 'src/app/services/storage';
import { AccountService } from 'src/app/services/account.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { MatInputModule } from '@angular/material/input';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
    encapsulation: ViewEncapsulation.None,
    imports: [
      CommonModule,
      IonicModule,
      FormsModule,
      ReactiveFormsModule,
      MatFormFieldModule,
      ButtonComponent,
      MatInputModule
    ],
})
export class LoginPage implements OnInit {
    loginForm: FormGroup | undefined;
    public isLoading: boolean | undefined;
    errorMessage: string | undefined;
    private userId: string | undefined;
    private unitId: string | undefined;
    visualization: string | undefined;

    public loggedOut = new BehaviorSubject(null);

    hidePass = true;
    passFocus = false;
    hidePassFirstAccess = true;
    passFirstAccessFocus = false;
    hideConfirmPassFirstAccess = true;
    confirmPassFirstAccessFocus = false;

    isFirstAccess: boolean | undefined;
    changePasswordForm: FormGroup | undefined;
    firstAccessMessage: string | undefined;

    constructor(
        private storage: StorageService,
        private formBuilder: FormBuilder,
        private accountService: AccountService,
        private router: Router,
        private auth: AuthService,
        private viewIndustryService: ViewIndustryService
    ) {}

    async ngOnInit() {
        if (await this.auth.isAuthenticated) {
            this.storage.clear();
            this.storage.clearAll();
            this.viewIndustryService.setDataViewIndustry([]);
            // this.loggedOut.next(true);
        }
        this.loginForm = this.formBuilder.group({
            username: ['', [Validators.required]],
            password: ['', Validators.required],
        });

        this.changePasswordForm = this.formBuilder.group(
            {
                password: ['', [Validators.required, Validators.minLength(8)]],
                confirmPassword: [''],
            },
            { validator: this.checkPasswords('password', 'confirmPassword') }
        );
    }

    onLogin() {
        this.isLoading = true;
        const username = this.loginForm?.get('username')?.value;
        const password = this.loginForm?.get('password')?.value;

        this.accountService.login(username, password).subscribe({
            next: (response:any) => {
                this.auth.login(
                    response.token,
                    response.visualization,
                    response.email,
                    response.userId
                );
                this.storage.setChangedPassword(!response.temporaryPassword);
                this.isFirstAccess = response.temporaryPassword;
                this.loginForm?.reset();
                this.changePasswordForm?.reset();
                this.userId = response.userId;
                this.visualization = response.visualization;
                    this.router.navigate(['/view-industry'], { replaceUrl: true });
            },
            error: e => {
                this.isLoading = false;
                this.errorMessage = e.error.message;
            },
            complete: async () => {
                if (
                    this.userId !== undefined &&
                    this.visualization !== 'radcom_admin'
                ) {
                  this.unitId = '8195ad05-b80f-4ddf-bdc8-cf64b85f232f';
                    await this.loadUserData();
                }
                this.loginForm?.reset();
                this.isLoading = false;
                this.errorMessage = undefined;
            },
        });
    }

    async loadUserData() {
        await this.accountService
            .user(this.userId || '')
            .then((resp:any) => {
                this.unitId = '8195ad05-b80f-4ddf-bdc8-cf64b85f232f';
            })
            .catch((erro:any) => {
                console.error('Falha ao pesuisar pelo usuário logado: ', erro);
            })
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            .finally(async () => {
                if (this.unitId !== undefined) {
                    await this.accountService
                        .unit(this.unitId)
                        .then((resp:any) => {
                            this.storage.setUnidade(resp.name);
                            this.storage.setUnidadeId(this.unitId || '');
                            this.storage.setCompanyId(resp.company);
                        })
                        .catch((error:any) => {
                            console.error('Unidade não localizada: ', error);
                        })
                        .finally(() => {});
                }
            });
    }

    checkPasswords(passwordKey: string, passwordConfirmationKey: string) {
        return (group: FormGroup) => {
            const passwordInput = group.controls[passwordKey],
                passwordConfirmationInput =
                    group.controls[passwordConfirmationKey];
            if (passwordInput.value !== passwordConfirmationInput.value) {
                return passwordConfirmationInput.setErrors({
                    notEquivalent: true,
                });
            } else {
                return passwordConfirmationInput.setErrors(null);
            }
        };
    }

    selectKey(event: KeyboardEvent) {
        const key = event.which;
        if (key == 10 || key == 13) {
            this.onLogin();
        }
    }

    async onChangePassword() {
        try {
            this.isLoading = true;
            const result = await this.accountService.updatePassword(
                this.userId || '',
                this.changePasswordForm?.value.password
            );
            this.isLoading = false;
            this.errorMessage = undefined;
            this.isFirstAccess = false;
            this.storage.setChangedPassword(!this.isFirstAccess);
            await this.loadUserData();
            this.router.navigate(['/'], { replaceUrl: true });
        } catch (e) {
        } finally {
            this.isLoading = false;
        }
    }
}
