import express from "express";
import apiRouter from "./api";
import { catchError, delay, filter, map, Observable, of, Subject, Subscription, take, takeUntil, tap, throwError } from "rxjs";


const port = 3000;

const app = express();
app.use(express.json());
app.use('/api', apiRouter);

app.listen(port, () => {
    console.log(`Api listening on ${port}`)
});

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

const destroy$ = new Subject();
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

function init(){
  numbers$.pipe(take(1)).subscribe((v) => console.log(`first subscribe: ${v}`));
  numbers$.pipe(takeUntil(destroy$)).subscribe((v) => console.log(`second subscribe: ${v}`));
}

function destroy(){
  destroy$.next('whatever');
  destroy$.complete();
}

init();
destroy();

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