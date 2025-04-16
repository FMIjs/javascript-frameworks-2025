import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowerBedComponent } from './flower-bed.component';

describe('FlowerBedComponent', () => {
  let component: FlowerBedComponent;
  let fixture: ComponentFixture<FlowerBedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlowerBedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlowerBedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
