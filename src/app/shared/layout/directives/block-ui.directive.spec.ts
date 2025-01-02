import { EmbeddedViewRef, Renderer2, TemplateRef, ViewContainerRef } from '@angular/core';
import { BlockUiDirective } from './block-ui.directive';

describe('BlockUiDirective', () => {
  let directive: BlockUiDirective;
  let templateRefMock: jasmine.SpyObj<TemplateRef<any>>;
  let viewContainerRefMock: jasmine.SpyObj<ViewContainerRef>;
  let rendererMock: jasmine.SpyObj<Renderer2>;
  let nativeElement: HTMLElement;
  let parentElement: HTMLElement;
  let overlayElement: HTMLElement;
  let embeddedViewRefMock: jasmine.SpyObj<EmbeddedViewRef<any>>;

  beforeEach(() => {
    templateRefMock = jasmine.createSpyObj('TemplateRef', ['elementRef']);
    viewContainerRefMock = jasmine.createSpyObj('ViewContainerRef', ['createEmbeddedView', 'clear']);
    rendererMock = jasmine.createSpyObj('Renderer2', ['createElement', 'setStyle', 'appendChild', 'removeChild']);

    // Create the DOM elements
    nativeElement = document.createElement('div');
    parentElement = document.createElement('div');
    parentElement.appendChild(nativeElement);
    overlayElement = document.createElement('div'); // Overlay element to mock

    // Mock createElement to return a new div element
    rendererMock.createElement.and.callFake((tagName: string) => {
      return document.createElement(tagName);
    });

    // Create an EmbeddedViewRef mock with rootNodes containing the native element
    embeddedViewRefMock = jasmine.createSpyObj('EmbeddedViewRef', [], { rootNodes: [nativeElement] });

    // Mock the ViewContainerRef to return the EmbeddedViewRef mock
    viewContainerRefMock.createEmbeddedView.and.returnValue(embeddedViewRefMock);

    directive = new BlockUiDirective(templateRefMock, viewContainerRefMock, rendererMock);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should show the overlay when layoutBlockUi is true', () => {
    directive.layoutBlockUi = true;

    directive.ngAfterViewInit();

    expect(viewContainerRefMock.createEmbeddedView).toHaveBeenCalledWith(templateRefMock);
    expect(rendererMock.createElement).toHaveBeenCalledWith('div');
    expect(rendererMock.appendChild).toHaveBeenCalledWith(nativeElement, jasmine.any(HTMLElement));
    expect(directive['overlayElement']).toBeTruthy();
  });

  it('should remove the overlay when layoutBlockUi is false', () => {
    // First, show the overlay
    directive.layoutBlockUi = true;
    directive.ngAfterViewInit();

    // Then, remove the overlay
    const currentOverlay = directive['overlayElement'];
    directive.layoutBlockUi = false;
    directive.ngOnChanges();

    expect(rendererMock.removeChild).toHaveBeenCalledWith(nativeElement, currentOverlay);
    expect(directive['overlayElement']).toBeNull();
  });

  it('should clean up the overlay on destroy', () => {
    directive.layoutBlockUi = true;
    directive.ngAfterViewInit();

    const currentOverlay = directive['overlayElement'];
    directive.ngOnDestroy();

    expect(rendererMock.removeChild).toHaveBeenCalledWith(nativeElement, currentOverlay);
    expect(directive['overlayElement']).toBeNull();
  });

  it('should not attempt to remove the overlay if it does not exist', () => {
    directive.layoutBlockUi = false;
    directive.ngOnChanges();

    directive.ngOnDestroy();

    expect(rendererMock.removeChild).not.toHaveBeenCalled();
  });

  it('should set position to relative if position is static', () => {
    spyOn(window, 'getComputedStyle').and.returnValue({ position: 'static' } as CSSStyleDeclaration);

    directive.layoutBlockUi = true;
    directive.ngAfterViewInit();

    expect(rendererMock.setStyle).toHaveBeenCalledWith(nativeElement, 'position', 'relative');
  });

  it('should not change position if it is already relative, absolute, or fixed', () => {
    spyOn(window, 'getComputedStyle').and.returnValue({ position: 'relative' } as CSSStyleDeclaration);

    directive.layoutBlockUi = true;
    directive.ngAfterViewInit();

    expect(rendererMock.setStyle).not.toHaveBeenCalledWith(nativeElement, 'position', 'relative');
  });

  it('should not recreate the embedded view on subsequent changes', () => {
    directive.layoutBlockUi = true;
    directive.ngAfterViewInit();

    directive.layoutBlockUi = false;
    directive.ngOnChanges();

    directive.layoutBlockUi = true;
    directive.ngOnChanges();

    expect(viewContainerRefMock.createEmbeddedView).toHaveBeenCalledTimes(1);
  });
});
