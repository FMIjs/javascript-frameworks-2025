import {
  directive,
  AsyncDirective,
  PartInfo,
  PartType,
} from "lit/async-directive.js";
import { nothing, TemplateResult } from "lit";
import type { Observable, Subscription } from "rxjs";

class AsyncIfDirective extends AsyncDirective {
  private subscription?: Subscription;
  private currentValue: unknown;

  constructor(partInfo: PartInfo) {
    super(partInfo);
    if (partInfo.type !== PartType.CHILD) {
      throw new Error("showIfAsync() can only be used in child bindings");
    }
  }

  render<T>(
    source$: Observable<T>,
    checkFn: (value: T) => boolean,
    template: (value: T) => TemplateResult
  ) {
    if (!this.subscription) {
      this.subscription = source$.subscribe((value) => {
        this.currentValue = value;
        this.setValue(checkFn(value) ? template(value) : nothing);
      });
    } else {
      return checkFn(this.currentValue as T)
        ? template(this.currentValue as T)
        : nothing;
    }
    return nothing;
  }

  disconnected() {
    this.subscription?.unsubscribe();
    this.subscription = undefined;
  }
}

export const asyncIf = <T>(
  source$: Observable<T>,
  checkFn: (value: T) => boolean,
  template: (value: T) => TemplateResult
) =>
  directive(AsyncIfDirective)(
    source$ as Observable<T>,
    checkFn as any,
    template as any
  );
