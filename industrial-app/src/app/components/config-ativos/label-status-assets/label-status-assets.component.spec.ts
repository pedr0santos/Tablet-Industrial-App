import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LabelStatusAssetsComponent } from './label-status-assets.component';

describe('LabelStatusAssetsComponent', () => {
    let component: LabelStatusAssetsComponent;
    let fixture: ComponentFixture<LabelStatusAssetsComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [LabelStatusAssetsComponent],
            imports: [IonicModule.forRoot()],
        }).compileComponents();

        fixture = TestBed.createComponent(LabelStatusAssetsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
