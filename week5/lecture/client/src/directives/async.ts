import {
  directive,
  AsyncDirective,
  PartInfo,
  PartType,
} from "lit/async-directive.js";
import type { Observable, Subscription } from "rxjs";

class ObservableValueDirective extends AsyncDirective {
  private subscription?: Subscription;
  private value: unknown;

  constructor(partInfo: PartInfo) {
    super(partInfo);
    if (partInfo.type !== PartType.CHILD) {
      throw new Error("async() can only be used in child bindings");
    }
  }

  render<T>(source$: Observable<T>) {
    if (!this.subscription) {
      this.subscription = source$.subscribe({
        next: (value) => {
          this.value = value;
          this.setValue(value);
        },
      });
    }
    return this.value;
  }

  disconnected() {
    this.subscription?.unsubscribe();
    this.subscription = undefined;
  }
}

export const async = directive(ObservableValueDirective);
