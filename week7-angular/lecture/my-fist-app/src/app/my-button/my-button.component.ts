import {
  Component,
  computed,
  ContentChild,
  effect,
  HostListener,
  Input,
  input,
  output,
  signal,
} from '@angular/core';

@Component({
  selector: '[appMyButton]',
  imports: [],
  templateUrl: './my-button.component.html',
  styleUrl: './my-button.component.scss',
  host: {
    '(click)': 'myHandler($event)',
  },
})
export class MyButtonComponent {
  _title = input.required<string>({ alias: 'title' });
  title = signal<string>('');
  myEvent = output();
  computedTitle = computed(() => {
    return this.title() + '(test)';
  });

  constructor() {
    effect(() => {
      console.log(this.title());
    });
  }

  ngOnInit() {
    this.title.set(this._title());
  }

  myHandler(e: MouseEvent) {
    this.title.update((prevValue) => prevValue + 1);
    // console.log(e);
  }
}
