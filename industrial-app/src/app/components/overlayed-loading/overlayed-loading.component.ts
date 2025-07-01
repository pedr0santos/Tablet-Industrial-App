import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
    selector: 'app-overlayed-loading',
    templateUrl: './overlayed-loading.component.html',
    styleUrls: ['./overlayed-loading.component.scss'],
    standalone: true,
    imports: [
      CommonModule,
      IonicModule
    ],
})
export class OverlayedLoadingComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
