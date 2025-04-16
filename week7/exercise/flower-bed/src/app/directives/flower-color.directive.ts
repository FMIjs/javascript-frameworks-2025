import { Directive, ElementRef, inject, input, OnChanges, SimpleChanges } from '@angular/core';
import { ColorType } from '../types/color-type';

/** Example directive for applying color to the host element. Let's say we don't have the color already calculated in FlowerStorageService. */
@Directive({
  selector: '[appFlowerColor]',
  standalone: true
})
export class FlowerColorDirective implements OnChanges {
  private elementRef = inject(ElementRef);
  private currentColor: ColorType | null = null;
  
  waterLevel = input.required<number>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['waterLevel']) {
      const newColor = this.calculateColor(this.waterLevel());
      
      // Only update if the color has changed
      if (newColor !== this.currentColor) {
        
        if (this.currentColor) {
          this.elementRef.nativeElement.classList.remove(this.currentColor);
        }
        
        // Add new color class
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
