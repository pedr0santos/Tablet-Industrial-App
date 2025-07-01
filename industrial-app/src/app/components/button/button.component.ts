import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { IonicModule } from '@ionic/angular';


@Component({
    selector: 'app-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss'],
    standalone: true,
    imports: [
        IonicModule,
        CommonModule,
        MatDialogModule,
    ],
})
export class ButtonComponent implements OnInit {
    @Input()
    title: string | undefined;

    @Input()
    btnStyle: string | undefined;

    @Input()
    disabled = false;

    @Input()
    iconSrc: string | undefined;

    @Input()
    rightIcon: string | undefined;

    @Input()
    type = 'button';

    constructor() {}

    ngOnInit() {}
}
