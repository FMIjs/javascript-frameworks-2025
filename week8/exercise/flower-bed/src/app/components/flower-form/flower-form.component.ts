import { Component, inject, output } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ColorType } from '../../../../server/src/types/color-type';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { IFlower, IFlowerDTO } from '../../../../server/src/types/flower';
import { Router } from '@angular/router';
import { flowerForm } from './form-controls';
import { FlowerService } from '../../services/flower.service';
import { take } from 'rxjs';

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
  private readonly flowerService = inject(FlowerService);
  private readonly router = inject(Router);

  createFlower = output<IFlowerDTO>();
  availableColors = Object.values(ColorType);

  flowerForm = flowerForm;

  submitFlower() {
    if (!this.flowerForm.valid) return;


    const formValue = this.flowerForm.getRawValue();
    const flowerData: IFlowerDTO = {
      color: formValue.color,
      waterLevel: Number(formValue.waterLevel)
    };
    this.flowerService.add(flowerData).pipe(take(1)).subscribe(() => {
      this.router.navigate(['/flower-bed']);
    });
  }
}
