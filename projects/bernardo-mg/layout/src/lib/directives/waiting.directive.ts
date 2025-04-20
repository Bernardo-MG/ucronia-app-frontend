import { Directive, ElementRef, inject, Input, Renderer2 } from '@angular/core';

/**
 * Directive to show a waiting prompt. Used while waiting.
 */
@Directive({
  selector: '[layoutWaiting]',
  standalone: true,
})
export class WaitingDirective {

  private readonly el = inject(ElementRef);

  private readonly renderer = inject(Renderer2);

  @Input() set layoutWaiting(value: boolean) {
    this.update();
  }

  private spinner?: HTMLElement;
  private originalContent?: string;

  private update() {
    const element = this.el.nativeElement;

    if (this.layoutWaiting) {
      // Only create spinner if it doesn't already exist
      if (!this.spinner) {
        this.spinner = this.renderer.createElement('span');
        ['spinner-border', 'spinner-border-sm'].forEach(c => this.renderer.addClass(this.spinner!, c));
      }

      // Save original content if not already done
      if (!this.originalContent) {
        this.originalContent = element.innerHTML;
      }

      // Clear content and show spinner
      element.innerHTML = '';
      this.renderer.appendChild(element, this.spinner);
      this.renderer.setAttribute(element, 'aria-busy', 'true');
    } else {
      // Restore original content when not in waiting state
      if (this.originalContent !== undefined) {
        element.innerHTML = this.originalContent;
        this.originalContent = undefined;
      }

      // Remove aria-busy attribute
      this.renderer.removeAttribute(element, 'aria-busy');
    }
  }
}
