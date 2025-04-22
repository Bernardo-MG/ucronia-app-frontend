import { Directive, EmbeddedViewRef, inject, Input, OnDestroy, Renderer2, TemplateRef, ViewContainerRef } from '@angular/core';

/**
 * Directive to block the UI, to avoid interaction. Used while waiting.
 */
@Directive({
  selector: '[layoutBlockUi]',
  standalone: true
})
export class BlockUiDirective implements OnDestroy {

  private readonly templateRef = inject(TemplateRef);

  private readonly viewContainer = inject(ViewContainerRef);

  private readonly renderer = inject(Renderer2);

  private overlayElement: HTMLElement | null = null;

  private embeddedView: EmbeddedViewRef<any> | null = null;

  @Input() set layoutBlockUi(value: boolean) {
    // Initialize the view once when the input is set for the first time
    this.initView();

    if (value) {
      this.showOverlay();
    } else {
      this.hideOverlay();
    }
  }

  public ngOnDestroy() {
    this.hideOverlay();
    this.viewContainer.clear();
  }

  private initView() {
    if (!this.embeddedView) {
      this.embeddedView = this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }

  private showOverlay() {
    if (!this.overlayElement && this.embeddedView) {
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

  private hideOverlay() {
    if (this.overlayElement && this.embeddedView) {
      const targetElement = this.embeddedView.rootNodes[0];
      this.renderer.removeChild(targetElement, this.overlayElement);
      this.overlayElement = null;
    }
  }
}
