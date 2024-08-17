import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appJustifyBetween]',
  standalone: true
})
export class JustifyBetweenDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.renderer.addClass(this.el.nativeElement, 'd-flex');
    this.renderer.addClass(this.el.nativeElement, 'justify-content-between');
  }

}
