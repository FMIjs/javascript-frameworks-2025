import {
  Directive,
  inject,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

@Directive({
  selector: '[appMyIf]',
})
export class MyIfDirective implements OnChanges {
  @Input() appMyIf = false;

  templateRef = inject(TemplateRef);
  viewContainerRef = inject(ViewContainerRef);

  ngOnChanges(changes: SimpleChanges): void {
    if (this.appMyIf) {
      this.viewContainerRef.createEmbeddedView(this.templateRef, {
        myValue: 123,
      });
    } else {
      this.viewContainerRef.clear();
    }
  }
}
