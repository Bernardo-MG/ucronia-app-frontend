import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[layoutPlaceholder]',
  standalone: true
})
export class PlaceholderDirective implements OnChanges {

  @Input() layoutPlaceholder!: boolean;  // Input property to control visibility

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private templateRef: TemplateRef<any>,  // Template reference for the actual content
    private viewContainer: ViewContainerRef  // View container for managing views
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    // Clear the view container each time the input changes
    //this.viewContainer.clear();

    if (this.layoutPlaceholder) {
      // Create a placeholder element with Bootstrap classes
      const placeholderElement = this.renderer.createElement('div');
      placeholderElement.classList.add('placeholder-glow', 'd-flex', 'flex-column');

      // Create a span for the placeholder
      const spanElement = this.renderer.createElement('span');
      spanElement.classList.add('placeholder', 'col-12');

      // Append the span to the placeholder element
      placeholderElement.appendChild(spanElement);

      // Insert the placeholder element into the view container
      const parentElement = this.el.nativeElement.parentElement;
      this.renderer.appendChild(parentElement, placeholderElement);
    } else {
      // Create an embedded view of the actual content
      this.viewContainer.createEmbeddedView(this.templateRef);  // Show the actual content
    }
  }

}
