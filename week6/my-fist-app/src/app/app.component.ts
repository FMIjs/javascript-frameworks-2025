import { Component, inject } from '@angular/core';
import { UserItemComponent } from './user-item/user-item.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [UserItemComponent],
  // providers: [
  //   {
  //     provide: 'nestho',
  //     useValue: 'test'
  //   }
  // ]
})
export class AppComponent {
  counter = 0;
  inputValue = '';
  showInput = false;

  // myValue = inject('nesto');

  users = [
    {
      username: 'Test 1',
      age: 10,
    },
    {
      username: 'Test 2',
      age: 10,
    },
    {
      username: 'Test 3',
      age: 10,
    },
  ];

  increment() {
    this.counter++;
  }

  trackByUsername(value: any) {
    return `${value.username}-${value.age}`;
  }

  setInputValue(inputEl: HTMLInputElement) {
    this.inputValue = inputEl.value;
    inputEl.value = '';
  }

  toggleShow() {
    this.showInput = !this.showInput;
  }

  log(value: any) {
    console.log(value);
  }
}
