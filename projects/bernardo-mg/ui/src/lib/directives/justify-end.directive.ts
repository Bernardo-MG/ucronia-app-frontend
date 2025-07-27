import { Directive, ElementRef, Renderer2, inject } from '@angular/core';

@Directive({
  selector: '[uiJustifyEnd]',
  standalone: true
})
export class JustifyEndDirective {
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);


  constructor() {
    this.renderer.addClass(this.el.nativeElement, 'd-flex');
    this.renderer.addClass(this.el.nativeElement, 'justify-content-end');
  }

}
