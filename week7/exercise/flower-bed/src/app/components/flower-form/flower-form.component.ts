import { Component, inject, output } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ColorType } from '../../types/color-type';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { IFlower } from '../../types/flower';
import { FlowerStorageService } from '../../services/flower-storage.service';
import { Router } from '@angular/router';
import { flowerForm } from './form-controls';

@Component({
  selector: 'app-flower-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './flower-form.component.html',
  styleUrl: './flower-form.component.scss',
})
export class FlowerFormComponent {
  private readonly flowerStorage = inject(FlowerStorageService);
  private readonly router = inject(Router);

  createFlower = output<Partial<IFlower>>();
  availableColors = Object.values(ColorType);

  flowerForm = flowerForm;

  submitFlower(){
    if (this.flowerForm.valid) {
      const formValue = this.flowerForm.getRawValue();
      const flowerData: Partial<IFlower> = {
        color: formValue.color,
        waterLevel: Number(formValue.waterLevel)
      };
      this.flowerStorage.addFlower(flowerData);
      this.router.navigate(['/flower-bed']);
    }
  }
}
