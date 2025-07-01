import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GaugeAssetComponent } from './gauge-asset.component';

describe('GaugeAssetComponent', () => {
  let component: GaugeAssetComponent;
  let fixture: ComponentFixture<GaugeAssetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GaugeAssetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GaugeAssetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
