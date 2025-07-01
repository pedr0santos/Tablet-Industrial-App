import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
    selector: 'app-data-asset',
    templateUrl: './data-asset.component.html',
    styleUrls: ['./data-asset.component.scss'],
    standalone: true,
    imports: [CommonModule, IonicModule,],
})
export class DataAssetComponent implements OnInit {
    @Input() type: string | undefined;
    @Input() unit: string | undefined;
    @Input() measurement: string | number | undefined;

    constructor() {}

    ngOnInit() {}
}
