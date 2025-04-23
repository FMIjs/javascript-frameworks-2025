import {
  Directive,
  HostBinding,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

@Directive({
  selector: '[appMyFor]',
})
export class MyForDirective<T> implements OnChanges {
  templateRef = inject(TemplateRef);
  viewContainerRef = inject(ViewContainerRef);

  @Input() appMyForOf: Array<T> = [];

  ngOnChanges(change: SimpleChanges): void {
    this.viewContainerRef.clear();
    this.appMyForOf.forEach((el, i) => {
      this.viewContainerRef.createEmbeddedView(this.templateRef, {
        $implicit: el,
        index: i,
      });
    });
  }
}
