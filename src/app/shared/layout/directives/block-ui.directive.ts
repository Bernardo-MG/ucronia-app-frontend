import { AfterViewInit, Directive, ElementRef, Input, OnDestroy, Renderer2, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[layoutBlockUi]',
  standalone: true
})
export class BlockUiDirective implements AfterViewInit, OnDestroy {

  private overlayElement: HTMLElement | null = null;

  @Input() layoutBlockUi!: boolean;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private renderer: Renderer2,
    private el: ElementRef
  ) {}

  ngAfterViewInit() {
    if (this.layoutBlockUi) {
      this.showOverlay();
    }
  }

  ngOnChanges() {
    if (this.layoutBlockUi) {
      this.showOverlay();
    } else {
      this.removeOverlay();
    }
  }

  private showOverlay() {
    if (!this.overlayElement) {
      this.viewContainer.createEmbeddedView(this.templateRef);

      const parentElement = this.el.nativeElement.parentElement;

      if (parentElement) {
        this.overlayElement = this.renderer.createElement('div');
        this.renderer.setStyle(this.overlayElement, 'position', 'absolute');
        this.renderer.setStyle(this.overlayElement, 'top', '0');
        this.renderer.setStyle(this.overlayElement, 'left', '0');
        this.renderer.setStyle(this.overlayElement, 'right', '0');
        this.renderer.setStyle(this.overlayElement, 'bottom', '0');
        this.renderer.setStyle(this.overlayElement, 'background', 'rgba(0, 0, 0, 0.5)');
        this.renderer.setStyle(this.overlayElement, 'z-index', '1000');
        this.renderer.setStyle(this.overlayElement, 'cursor', 'not-allowed');

        this.renderer.appendChild(parentElement, this.overlayElement);
      }
    }
  }

  private removeOverlay() {
    if (this.overlayElement) {
      this.renderer.removeChild(this.el.nativeElement.parentElement, this.overlayElement);
      this.overlayElement = null;
    }
  }

  ngOnDestroy() {
    this.removeOverlay();
  }

}
