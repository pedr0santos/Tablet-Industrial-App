import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OverlayedLoadingComponent } from './overlayed-loading.component';

describe('OverlayedLoadingComponent', () => {
    let component: OverlayedLoadingComponent;
    let fixture: ComponentFixture<OverlayedLoadingComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [OverlayedLoadingComponent],
            imports: [IonicModule.forRoot()],
        }).compileComponents();

        fixture = TestBed.createComponent(OverlayedLoadingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
