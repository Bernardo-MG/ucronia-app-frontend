import { Directive, ElementRef, Renderer2, inject } from '@angular/core';

@Directive({
  selector: '[uiJustifyCenter]',
  standalone: true
})
export class JustifyCenterDirective {
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);


  constructor() {
    this.renderer.addClass(this.el.nativeElement, 'd-flex');
    this.renderer.addClass(this.el.nativeElement, 'justify-content-center');
  }

}
