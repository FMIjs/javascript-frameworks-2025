import { BehaviorSubject, distinctUntilChanged, map, take } from "rxjs";

export class Store<
  T extends Record<string, string | number | object | null | undefined>
> {
  store$$: BehaviorSubject<T>;
  constructor(initialValue: T) {
    this.store$$ = new BehaviorSubject<T>(initialValue);
  }

  setValue(key: keyof T, value: T[keyof T] | ((store: T) => T[keyof T])) {
    this.store$$.pipe(take(1)).subscribe({
      next: (store) => {
        const newValue = typeof value === "function" ? value(store) : value;
        this.store$$.next({ ...store, [key]: newValue });
      },
    });
  }

  select(key: keyof T) {
    return this.store$$.pipe(
      map((store) => store[key]),
      distinctUntilChanged()
    );
  }
}
