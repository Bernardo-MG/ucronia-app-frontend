import { AfterViewInit, Directive, ElementRef, Input, OnChanges, Renderer2 } from '@angular/core';

@Directive({
  selector: '[layoutWaiting]',
  standalone: true,
})
export class WaitingDirective implements AfterViewInit, OnChanges {

  @Input() layoutWaiting = false;

  private spinner?: HTMLElement;

  private originalContent?: string;

  constructor(
    private el: ElementRef<HTMLButtonElement>,
    private renderer: Renderer2
  ) { }

  ngAfterViewInit() {
    this.update();
  }

  ngOnChanges() {
    this.update();
  }

  private update() {
    const button = this.el.nativeElement;
    if (!(button instanceof HTMLButtonElement)) {
      console.warn('layoutWaiting should be used on a <button>.');
      return;
    }

    if (this.layoutWaiting) {
      if (!this.spinner) {
        this.spinner = this.renderer.createElement('span');
        ['spinner-border', 'spinner-border-sm'].forEach(c => this.renderer.addClass(this.spinner!, c));
      }

      if (!this.originalContent) {
        this.originalContent = button.innerHTML;
      }

      button.innerHTML = '';
      this.renderer.appendChild(button, this.spinner);
      this.renderer.setAttribute(button, 'aria-busy', 'true');
    } else {
      if (this.originalContent !== undefined) {
        button.innerHTML = this.originalContent;
        this.originalContent = undefined;
      }

      this.renderer.removeAttribute(button, 'aria-busy');
    }
  }

}