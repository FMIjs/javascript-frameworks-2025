import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { IFlower } from '../types/flower';
import { FlowerColorDirective } from '../directives/flower-color.directive';


const MAX_HEIGHT = 15;
@Component({
  selector: 'app-flower',
  imports: [FlowerColorDirective],
  templateUrl: './flower.component.html',
  styleUrl: './flower.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FlowerComponent {
  flower = input<IFlower | null>(null);
  modifier = input<number>(0);
  water = output<IFlower>();

  get canWater() {
    return (this.flower()?.waterLevel || 0) < MAX_HEIGHT;
  }

  get flowerElements() {
    return Array(this.flower()?.waterLevel)
      .fill(0)
      .map((_, index) => {

        const idxLen = 2 * (index + 1) - 1;
        return Array(idxLen)
          .fill(0)
          .map((_, i) => i % 2 === 0 ? '1' : '0')
          .join('');
      });
  }
}