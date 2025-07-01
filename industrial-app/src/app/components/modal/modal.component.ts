import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { IonicModule } from '@ionic/angular';
import { ButtonComponent } from '../button/button.component';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        IonicModule,
        ButtonComponent,
        MatDialogModule,

    ],
})
export class ModalComponent implements OnInit {
    icon: string | undefined;
    constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

    ngOnInit() {}
}
