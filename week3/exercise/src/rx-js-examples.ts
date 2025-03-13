import { Observable, Subject, take, takeUntil, tap } from "rxjs";

const destroy$$ = new Subject();
const numbers$ = new Observable<number>((observer) => {
  observer.next(1);
  observer.next(2);
  observer.next(3);
  setTimeout(() => {
    observer.next(4);
    observer.next(5);
  }, 2000);

  observer.complete();
}).pipe(
  tap(console.log)
);

export function init(){
  numbers$.pipe(take(1)).subscribe((v) => console.log(`first subscribe: ${v}`));
  numbers$.pipe(takeUntil(destroy$$)).subscribe((v) => console.log(`second subscribe: ${v}`));
}

export function destroy(){
  destroy$$.next('whatever');
  destroy$$.complete();
}

// of(1, 2, 3)
//   .pipe(
//     map((x) =>  {
//       return x * x;
//     }),
//     filter(x => x > 1),
//     tap(x => console.log('Effect after filter', x)),
//     tap(x => {
//       throw new Error('Custom error')
//     }),
//     catchError(err => {
//       console.log('err');
//       //throw err;
//       return '1';
//     }),
//     tap(x => console.log('After err', x))
//   ).subscribe((v) => 
//     console.log(`value: ${v}`
//   )
// );

// of([1, 2, 3])
//   .pipe(
//     map((arr) => {
//       return arr.map(el => {
//         return el * el;
//       });
//     }),
//   )
//   .subscribe((v) => console.log(`arr value: ${v}`)
// );

