import { Directive, ElementRef, Renderer2, inject } from '@angular/core';

@Directive({
  selector: '[uiJustifyBetween]',
  standalone: true
})
export class JustifyBetweenDirective {
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);


  constructor() {
    this.renderer.addClass(this.el.nativeElement, 'd-flex');
    this.renderer.addClass(this.el.nativeElement, 'justify-content-between');
  }

}
