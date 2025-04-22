import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[uiJustifyEnd]',
  standalone: true
})
export class JustifyEndDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.renderer.addClass(this.el.nativeElement, 'd-flex');
    this.renderer.addClass(this.el.nativeElement, 'justify-content-end');
  }

}
