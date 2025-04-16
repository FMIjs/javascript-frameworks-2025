import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ColorType } from "../../types/color-type";

export interface FlowerFormControls {
  color: FormControl<ColorType>;
  waterLevel: FormControl<number>;
}

export const flowerForm = new FormGroup<FlowerFormControls>({
  color: new FormControl<ColorType>(ColorType.GREEN, { validators: [Validators.required], nonNullable: true }),
  waterLevel: new FormControl<number>(0, { validators: [Validators.required, Validators.min(0), Validators.max(10)], nonNullable: true }),
});