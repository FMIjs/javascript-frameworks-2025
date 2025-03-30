import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-user-item',
  imports: [],
  templateUrl: './user-item.component.html',
  styleUrl: './user-item.component.scss',
})
export class UserItemComponent {
  @Input({ required: true }) username!: string;
  @Input({ required: true }) age!: number;

  @Output() test = new EventEmitter<{ num: number }>();

  deleteHandler(event: MouseEvent) {
    console.log(event);
    this.test.emit({ num: 123 });
  }
}
