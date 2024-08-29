import { AfterViewInit, Directive, ElementRef, Input, OnChanges, OnDestroy, Optional, Renderer2, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[layoutPlaceholder]',
  standalone: true
})
export class PlaceholderDirective implements OnChanges, AfterViewInit, OnDestroy {

  @Input() layoutPlaceholder!: boolean;

  private placeholderElement: HTMLElement | null = null;

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    // Template reference, optional for cases without ng-template
    @Optional() private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) { }

  public ngAfterViewInit() {
    if (this.layoutPlaceholder) {
      this.showPlaceholder();
    }
  }

  public ngOnChanges() {
    // Clear any previously rendered content
    this.viewContainer.clear();

    if (this.layoutPlaceholder) {
      this.showPlaceholder();
    } else {
      this.removePlaceholder();
    }
  }

  public ngOnDestroy() {
    this.removePlaceholder();
  }

  private showPlaceholder() {
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
  }

  private removePlaceholder() {
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
