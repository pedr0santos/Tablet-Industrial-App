import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';


@Component({
    selector: 'app-icon-asset',
    templateUrl: './icon-asset.component.html',
    styleUrls: ['./icon-asset.component.scss'],
         imports: [
       CommonModule,
       IonicModule,
     ]
})
export class IconAssetComponent implements OnInit {
    @Input() class: string | undefined;
    @Input() icon: string | undefined;
    @Input() name: string | undefined;
    @Input() modoHorizontal = false;

    constructor() {}

    ngOnInit() {}
}
