import { AfterViewInit, Directive, ElementRef, Input, OnChanges, OnDestroy, Renderer2 } from '@angular/core';

@Directive({
  selector: '[layoutWaiting]',
  standalone: true,
})
export class WaitingDirective implements OnChanges, AfterViewInit, OnDestroy {

  @Input() public layoutWaiting!: boolean;

  private waitingIcon: HTMLElement | null = null;

  private originalContent: string | null = null;

  constructor(
    private elementRef: ElementRef<HTMLElement>,
    private renderer: Renderer2
  ) { }

  public ngAfterViewInit() {
    this.updateView();
  }

  public ngOnChanges() {
    this.updateView();
  }

  public ngOnDestroy() {
    this.waitingIcon = null;
  }

  private updateView() {
    const button = this.elementRef.nativeElement;

    if (!(button instanceof HTMLButtonElement)) {
      console.warn('layoutWaiting should be used on a <button> element.');
      return;
    }

    if (this.layoutWaiting) {
      this.showWaiting(button);
    } else {
      this.hideWaiting(button);
    }
  }

  private showWaiting(button: HTMLButtonElement) {
    if (!this.waitingIcon) {
      this.waitingIcon = this.renderer.createElement('span');
      this.renderer.addClass(this.waitingIcon, 'spinner-border');
      this.renderer.addClass(this.waitingIcon, 'spinner-border-sm');
      this.renderer.addClass(this.waitingIcon, 'mr-1');
    }

    if (this.originalContent === null) {
      this.originalContent = button.innerHTML; // Save original content
    }

    // Clear button content
    button.innerHTML = '';

    // Add spinner
    this.renderer.appendChild(button, this.waitingIcon);

    this.renderer.setAttribute(button, 'aria-busy', 'true');
  }

  private hideWaiting(button: HTMLButtonElement) {
    if (this.waitingIcon && button.contains(this.waitingIcon)) {
      this.renderer.removeChild(button, this.waitingIcon);
    }

    if (this.originalContent !== null) {
      button.innerHTML = this.originalContent; // Restore original content
      this.originalContent = null;
    }

    this.renderer.removeAttribute(button, 'aria-busy');
  }

}
