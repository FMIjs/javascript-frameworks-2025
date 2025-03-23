import { directive, Directive, PartInfo, PartType } from "lit/directive.js";
import { Observable, Subscription } from "rxjs";

class AsyncDirective extends Directive {
  value: any;
  subscription: Subscription | undefined;

  constructor(partInfo: PartInfo) {
    super(partInfo);
    if (partInfo.type === PartType.CHILD) return;
    throw new Error("async() can only be used in child bindings");
  }

  render<T>(source$: Observable<T>) {
    this.subscription =
      this.subscription ||
      source$.subscribe({
        next: (value) => {
          // TODO: try extending Async Directive from lit
          (this as any).__part._$setValue(value, this);
          this.value = value;
        },
      });
    return this.value;
  }

  disconnected() {
    this.subscription?.unsubscribe();
  }
}

export const async = directive(AsyncDirective);
