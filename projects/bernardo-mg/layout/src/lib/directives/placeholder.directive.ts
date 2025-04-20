import { Directive, EmbeddedViewRef, Input, Renderer2, TemplateRef, ViewContainerRef } from '@angular/core';

/**
 * Directive to show a placeholder for an input. Used while waiting.
 */
@Directive({
  selector: '[layoutPlaceholder]',
  standalone: true
})
export class PlaceholderDirective {

  @Input() set layoutPlaceholder(value: boolean) {
    if (value) {
      this.showPlaceholderInContent();
    } else {
      this.showContentWithoutPlaceholder();
    }
  }

  private placeholderElement: HTMLElement | null = null;
  private embeddedView: EmbeddedViewRef<any> | null = null;

  constructor(
    private renderer: Renderer2,
    private viewContainer: ViewContainerRef,
    private templateRef: TemplateRef<any>
  ) { }

  private showPlaceholderInContent() {
    // Clear any previous content
    this.viewContainer.clear();

    // Create and insert the embedded view
    this.embeddedView = this.viewContainer.createEmbeddedView(this.templateRef);

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

    // Insert the placeholder inside the first root node of the embedded view
    if (this.embeddedView && this.embeddedView.rootNodes.length > 0) {
      const originalContentNode = this.embeddedView.rootNodes[0];

      // Clear the original content node's children (if any)
      this.renderer.setProperty(originalContentNode, 'innerHTML', '');

      // Append the placeholder inside the original content node
      this.renderer.appendChild(originalContentNode, this.placeholderElement);
    }
  }

  private showContentWithoutPlaceholder() {
    // Clear the view container to remove the placeholder and previous content
    this.viewContainer.clear();

    // Recreate the original content
    this.embeddedView = this.viewContainer.createEmbeddedView(this.templateRef);

    // Remove placeholder
    this.placeholderElement = null;
  }
}
