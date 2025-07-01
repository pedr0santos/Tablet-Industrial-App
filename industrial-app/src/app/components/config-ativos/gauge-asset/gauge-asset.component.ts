import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IonicModule } from '@ionic/angular';


@Component({
    selector: 'app-gauge-asset',
    templateUrl: './gauge-asset.component.html',
    styleUrls: ['./gauge-asset.component.scss'],
     imports: [
       CommonModule,
       IonicModule,
     ]
})
export class GaugeAssetComponent implements OnChanges {
    @Input() percentage: number | undefined;
    @Input() minimum: number | undefined;
    transform: string | undefined;
    display: string | undefined;

    ngOnChanges(changes: SimpleChanges): void {
      if(this.percentage && this.minimum)
        this.updateFuelGauge(this.percentage, this.minimum);
    }

    updateFuelGauge(percentage: number, minimum: number) {
        if (percentage === null || percentage < 0) {
            percentage = 0;
        } else if (percentage > 100) {
            percentage = 100;
        }

        // Calcular o ângulo de rotação do ponteiro
        const angle = (percentage / 100) * 180 - 90;
        this.transform = `rotate(${angle} 50 50)`;

        // Exibir ou ocultar o alerta de combustível baixo
        if (percentage < minimum) {
            this.display = 'block';
        } else {
            this.display = 'none';
        }
    }
}
