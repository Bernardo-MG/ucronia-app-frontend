import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[layoutResponsiveShortColumns]',
  standalone: true
})
export class ResponsiveShortColumnsDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.renderer.addClass(this.el.nativeElement, 'col-md-10');
    this.renderer.addClass(this.el.nativeElement, 'offset-md-1');
    this.renderer.addClass(this.el.nativeElement, 'col-lg-8');
    this.renderer.addClass(this.el.nativeElement, 'offset-lg-2');
    this.renderer.addClass(this.el.nativeElement, 'col-xl-6');
    this.renderer.addClass(this.el.nativeElement, 'offset-xl-3');
  }

}
