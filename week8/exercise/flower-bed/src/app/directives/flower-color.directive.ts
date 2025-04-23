import { Directive, ElementRef, inject, input, OnChanges, SimpleChanges } from '@angular/core';
import { ColorType } from '../../../server/src/types/color-type';

@Directive({
  selector: '[appFlowerColor]',
  standalone: true
})
export class FlowerColorDirective implements OnChanges {
  private elementRef = inject(ElementRef);
  private currentColor: ColorType | null = null;
  
  waterLevel = input.required<number>();
  flowerId = input.required<string>();

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.flowerId(), changes)
    if (changes['waterLevel']) {
      const newColor = this.calculateColor(this.waterLevel());
      
      if (newColor !== this.currentColor) {
        
        if (this.currentColor) {
          this.elementRef.nativeElement.classList.remove(this.currentColor);
        }
        
        this.elementRef.nativeElement.classList.add(newColor);
        this.currentColor = newColor;
      }
    }
  }

  private calculateColor(waterLevel: number): ColorType {
    if (waterLevel <= 4) {
      return ColorType.BROWN;
    } else if (waterLevel <= 8) {
      return ColorType.YELLOW;
    }
    return ColorType.GREEN;
  }
}
