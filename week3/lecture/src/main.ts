import { AppRoot } from "./app-root";
const app = new AppRoot();
document.body.appendChild(app);

// import { of, map, scan, queueScheduler } from "rxjs";

// [1].map((x) => x + 1).map((x) => x + 1);

// const p = new Promise((res, rej) => {
//   setTimeout(() => rej());
// });
// p.then()

// Promise.resolve(1)
//   .then((x) => x + 1)
//   .then((x) => x + 1);

// of(1, 2, 3)
//   .pipe(scan((acc, value) => acc + value, 0))
//   .subscribe((value) => {
//     console.log(value);
//   });

// const result = compose(add(1), multiply(2));

// result(2)
