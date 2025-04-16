import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  imports: [],
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss',
})
export class TestComponent {
  @Input({ required: true }) value!: number;
  test: string = '';

  ngAfterViewInit(): void {
    if (this.value > 1) {
      this.test = 'HELLO';
    }
  }
}
