import { AfterViewInit, Directive, ElementRef, EmbeddedViewRef, Input, OnChanges, OnDestroy, Renderer2, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[layoutBlockUi]',
  standalone: true
})
export class BlockUiDirective implements OnChanges, AfterViewInit, OnDestroy {

  @Input() layoutBlockUi!: boolean;

  private overlayElement: HTMLElement | null = null;
  private embeddedView: EmbeddedViewRef<any> | null = null;
  
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private renderer: Renderer2,
    private el: ElementRef
  ) { }

  public ngAfterViewInit() {
    if (this.layoutBlockUi) {
      this.showOverlay();
    }
  }

  public ngOnChanges() {
    if (this.layoutBlockUi) {
      this.showOverlay();
    } else {
      this.removeOverlay();
    }
  }

  public ngOnDestroy() {
    this.removeOverlay();
  }

  private showOverlay() {
    if (!this.overlayElement) {
      // Create and insert the embedded view
      this.embeddedView = this.viewContainer.createEmbeddedView(this.templateRef);

      const targetElement = this.embeddedView.rootNodes[0];

      // Ensure the target element has a position style
      const computedStyle = window.getComputedStyle(targetElement);
      if (computedStyle.position === 'static' || !computedStyle.position) {
        this.renderer.setStyle(targetElement, 'position', 'relative');
      }

      this.overlayElement = this.renderer.createElement('div');
      this.renderer.setStyle(this.overlayElement, 'position', 'absolute');
      this.renderer.setStyle(this.overlayElement, 'top', '0');
      this.renderer.setStyle(this.overlayElement, 'left', '0');
      this.renderer.setStyle(this.overlayElement, 'right', '0');
      this.renderer.setStyle(this.overlayElement, 'bottom', '0');
      this.renderer.setStyle(this.overlayElement, 'background', 'rgba(0, 0, 0, 0.5)');
      this.renderer.setStyle(this.overlayElement, 'z-index', '1000');
      this.renderer.setStyle(this.overlayElement, 'cursor', 'not-allowed');

      this.renderer.appendChild(targetElement, this.overlayElement);
    }
  }

  private removeOverlay() {
    if (this.overlayElement) {
      const targetElement = this.embeddedView?.rootNodes[0];
      if (targetElement) {
        this.renderer.removeChild(targetElement, this.overlayElement);
      }
      this.overlayElement = null;
    }
  }
}
