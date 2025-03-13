import { BehaviorSubject, debounceTime, delay, Observable, of, Subject, tap, throttle } from "rxjs";
import { Book } from "./types/book";

const DEFAULT_BOOKS_VALUE: Book[] = [];

export class Consumer {

  private readonly store: {
    books$$: BehaviorSubject<Book[]>;
    numbers$$: Subject<number[]>;
    numbersB$$: BehaviorSubject<number[]>;
  } = {
      books$$: new BehaviorSubject<Book[]>(DEFAULT_BOOKS_VALUE),
      numbers$$: new Subject<number[]>(),
      numbersB$$: new BehaviorSubject<number[]>([])
    };

  constructor() {

    this.test5();
    // this.store.books$$.subscribe(books => {
    //   console.log(`${books.length} books in store`, );
    // });
    // this.store.books$$.next(DEFAULT_BOOKS_VALUE);
    // this.loadBooks();
  }

  test1() {
    this.store.numbers$$.next([1]);
    this.store.numbers$$.subscribe(b => console.log('1', b)); // 2, 3, 4
    this.store.numbers$$.next([2]);
    this.store.numbers$$.subscribe(b => console.log('2', b)); // 3, 4
    this.store.numbers$$.next([3]);
    this.store.numbers$$.subscribe(b => console.log('3', b)); // 4
    this.store.numbers$$.next([4]);
    this.store.numbers$$.subscribe(b => console.log('4', b)); // ?
  }

  test2() {
    this.store.numbersB$$.next([1]);
    this.store.numbersB$$.subscribe(b => console.log('1', b));
    this.store.numbersB$$.next([2]);
    this.store.numbersB$$.subscribe(b => console.log('2', b));
    this.store.numbersB$$.next([3]);
    this.store.numbersB$$.subscribe(b => console.log('3', b));
    this.store.numbersB$$.next([4]);
    this.store.numbersB$$.subscribe(b => console.log('4', b));
  }

  test3() {
    const obs$ = of(1, 2, 3); // lazy
    obs$.subscribe(b => console.log('1', b));
    obs$.subscribe(b => console.log('2', b));
    obs$.subscribe(b => console.log('3', b));
    obs$.subscribe(b => console.log('4', b));
  }

  test4() {
    const obs$ = of(1, 2, 3); // lazy
    obs$.pipe(
      tap(d => console.log(`t11 ${d}`)),
      delay(4000),
      tap(d => console.log(`t12 ${d}`)),
    ).subscribe(d => console.log(`d1 ${d}`));

    obs$.pipe(
      tap(d => console.log(`t21 ${d}`)),
      delay(2000),
      tap(d => console.log(`t22 ${d}`)),
    ).subscribe(d => console.log(`d2 ${d}`));
  }

  test5() {
    const obs$ = of(1, 2, 3); // lazy
    obs$.pipe(
      tap(d => console.log(`t11 ${d}`)),
      debounceTime(1000),
      tap(d => console.log(`t12 ${d}`)),
    ).subscribe(d => console.log(`d1 ${d}`));
  }

  loadBooks() {
    fetch('http://localhost:3000/api/books')
      .then(response => response.json())
      .then(data => {
        console.log('got some books');
        this.store.books$$.next(data as Book[]);
      }
      );
  }
}