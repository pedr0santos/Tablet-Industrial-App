import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ViewIndustryService {
  dataViewIndustry = [];

  constructor() {}

  setDataViewIndustry(data: any) {
    this.dataViewIndustry = data;
  }

  getDataViewIndustry() {
    return this.dataViewIndustry;
  }

  hasDataLoaded() {
    return this.dataViewIndustry.length > 0;
  }
}
