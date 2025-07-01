import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';


@Component({
    selector: 'app-label-status-assets',
    templateUrl: './label-status-assets.component.html',
    styleUrls: ['./label-status-assets.component.scss'],
         imports: [
       CommonModule,IonicModule,
     ]
})
export class LabelStatusAssetsComponent implements OnInit {
    @Input() class: string | undefined;
    @Input() status: string | undefined;

    @Input() class2?: string;
    @Input() status2?: string;

    @Input() class3?: string;
    @Input() status3?: string;

    @Input() type?: string = '';

    constructor() {}

    ngOnInit() {}
}
