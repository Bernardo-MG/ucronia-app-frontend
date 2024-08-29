import { Directive, ElementRef, Input, OnChanges, Optional, Renderer2, SimpleChanges, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[layoutPlaceholder]',
  standalone: true
})
export class PlaceholderDirective implements OnChanges {

  @Input() layoutPlaceholder!: boolean;  // Input property to control visibility

  private placeholderElement: HTMLElement | null = null;  // Placeholder element reference

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    @Optional() private templateRef: TemplateRef<any>,  // Template reference, optional for cases without ng-template
    private viewContainer: ViewContainerRef
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    this.viewContainer.clear();  // Clear any previously rendered content

    if (this.layoutPlaceholder) {
      // Create a placeholder element if it doesn't exist
      if (!this.placeholderElement) {
        this.placeholderElement = this.renderer.createElement('div');
        this.renderer.addClass(this.placeholderElement, 'placeholder-glow');
        this.renderer.addClass(this.placeholderElement, 'd-flex');
        this.renderer.addClass(this.placeholderElement, 'flex-column');

        const spanElement = this.renderer.createElement('span');
        this.renderer.addClass(spanElement, 'placeholder');
        this.renderer.addClass(spanElement, 'col-12');

        this.renderer.appendChild(this.placeholderElement, spanElement);
      }

      // Clear the element content and insert the placeholder element
      this.el.nativeElement.innerHTML = '';
      this.renderer.appendChild(this.el.nativeElement, this.placeholderElement);
    } else {
      // Remove the placeholder element and render the actual content
      if (this.placeholderElement) {
        this.renderer.removeChild(this.el.nativeElement, this.placeholderElement);
        this.placeholderElement = null;
      }
      if (this.templateRef) {
        // Create an embedded view if templateRef exists (for ng-template contexts)
        this.viewContainer.createEmbeddedView(this.templateRef);
      }
    }
  }

}
