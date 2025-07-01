import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private unidadeSubject = new BehaviorSubject<string | null>(null);
  private unidadeIdSubject = new BehaviorSubject<string | null>(null);
  private companyIdSubject = new BehaviorSubject<string | null>(null);
  private userIdSubject = new BehaviorSubject<string | null>(null);
  private visualizationSubject = new BehaviorSubject<string | null>(null);
  private emailSubject = new BehaviorSubject<string | null>(null);
  private changedPasswordSubject = new BehaviorSubject<boolean | null>(null);

  unidade$ = this.unidadeSubject.asObservable();
  unidadeId$ = this.unidadeIdSubject.asObservable();
  companyId$ = this.companyIdSubject.asObservable();
  userId$ = this.userIdSubject.asObservable();
  visualization$ = this.visualizationSubject.asObservable();
  email$ = this.emailSubject.asObservable();
  changedPassword$ = this.changedPasswordSubject.asObservable();

  async setUnidade(value: string) {
    await Preferences.set({ key: 'unidade', value });
    this.unidadeSubject.next(value);
  }

  async setUnidadeId(value: string) {
    await Preferences.set({ key: 'unidadeId', value });
    this.unidadeIdSubject.next(value);
  }

  async setCompanyId(value: string) {
    await Preferences.set({ key: 'companyId', value });
    this.companyIdSubject.next(value);
  }

  async setUserId(value: string) {
    await Preferences.set({ key: 'userId', value });
    this.userIdSubject.next(value);
  }

  async setVisualization(value: string) {
    await Preferences.set({ key: 'visualization', value });
    this.visualizationSubject.next(value);
  }

  async setEmail(value: string) {
    await Preferences.set({ key: 'email', value });
    this.emailSubject.next(value);
  }

  async setChangedPassword(value: boolean) {
    await Preferences.set({ key: 'changedPassword', value: value.toString() });
    this.changedPasswordSubject.next(value);
  }

  async restoreFromStorage() {
    const unidade = await Preferences.get({ key: 'unidade' });
    this.unidadeSubject.next(unidade.value);

    const unidadeId = await Preferences.get({ key: 'unidadeId' });
    this.unidadeIdSubject.next(unidadeId.value);

    const companyId = await Preferences.get({ key: 'companyId' });
    this.companyIdSubject.next(companyId.value);

    const userId = await Preferences.get({ key: 'userId' });
    this.userIdSubject.next(userId.value);

    const visualization = await Preferences.get({ key: 'visualization' });
    this.visualizationSubject.next(visualization.value);

    const email = await Preferences.get({ key: 'email' });
    this.emailSubject.next(email.value);

    const changedPassword = await Preferences.get({ key: 'changedPassword' });
    this.changedPasswordSubject.next(changedPassword.value === 'true');
  }

  get unidade() {
    return this.unidadeSubject.value;
  }

  get unidadeId() {
    return this.unidadeIdSubject.value;
  }

  get companyId() {
    return this.companyIdSubject.value;
  }

  get userId() {
    return this.userIdSubject.value;
  }

  get visualization() {
    return this.visualizationSubject.value;
  }

  get email() {
    return this.emailSubject.value;
  }

  get changedPassword() {
    return this.changedPasswordSubject.value;
  }

  // Métodos genéricos com Capacitor Preferences

  async set(key: string, value: string): Promise<void> {
    await Preferences.set({ key, value });
  }

  async get(key: string): Promise<string | null> {
    const result = await Preferences.get({ key });
    return result.value;
  }

  async remove(key: string): Promise<void> {
    await Preferences.remove({ key });
  }

  async clear(): Promise<void> {
    await Preferences.clear();
  }

  async clearAll(): Promise<void> {
    await this.clear();

    this.unidadeSubject.next(null);
    this.unidadeIdSubject.next(null);
    this.companyIdSubject.next(null);
    this.userIdSubject.next(null);
    this.visualizationSubject.next(null);
    this.emailSubject.next(null);
    this.changedPasswordSubject.next(null);
  }
}
