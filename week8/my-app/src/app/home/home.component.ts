import {
  afterNextRender,
  ChangeDetectorRef,
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { UserService } from '../user.service';
import { AsyncPipe } from '@angular/common';
import {
  BehaviorSubject,
  defer,
  fromEvent,
  map,
  merge,
  shareReplay,
  Subject,
  switchMap,
} from 'rxjs';
import { User } from '../types/user';
import { TestComponent } from '../test/test.component';

@Component({
  selector: 'app-home',
  imports: [AsyncPipe, TestComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  @ViewChild('reloadButton', { static: true })
  reloadButton!: ElementRef<HTMLButtonElement>;

  @ViewChild('myTestCmp', { static: true })
  myTestCmp!: TestComponent;

  userService = inject(UserService);
  changeDetector = inject(ChangeDetectorRef);

  loadUsers$ = new Subject<Event | void>();
  users$ = merge(
    [null],
    this.loadUsers$.pipe(switchMap(() => this.userService.getUsers()))
  );

  loading$ = merge(
    this.loadUsers$.pipe(map(() => true)),
    this.users$.pipe(map(() => false))
  );

  constructor() {
    afterNextRender(() => this.loadUsers$.next());
  }

  ngOnInit() {
    fromEvent(this.reloadButton.nativeElement, 'click').subscribe(
      this.loadUsers$
    );
  }
}
