import { TemplateRef, ViewContainerRef, Renderer2, ElementRef, EmbeddedViewRef } from '@angular/core';
import { BlockUiDirective } from './block-ui.directive';

describe('BlockUiDirective', () => {
  let directive: BlockUiDirective;
  let templateRefMock: jasmine.SpyObj<TemplateRef<any>>;
  let viewContainerRefMock: jasmine.SpyObj<ViewContainerRef>;
  let rendererMock: jasmine.SpyObj<Renderer2>;
  let elementRefMock: jasmine.SpyObj<ElementRef>;
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

    // Create an EmbeddedViewRef mock with rootNodes containing the overlay element
    embeddedViewRefMock = jasmine.createSpyObj('EmbeddedViewRef', [], { rootNodes: [overlayElement] });

    // Mock the ViewContainerRef to return the EmbeddedViewRef mock
    viewContainerRefMock.createEmbeddedView.and.returnValue(embeddedViewRefMock);

    // Assign the native element with a parent element to the mock
    elementRefMock = jasmine.createSpyObj('ElementRef', [], { nativeElement });

    directive = new BlockUiDirective(templateRefMock, viewContainerRefMock, rendererMock, elementRefMock);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should show the overlay when layoutBlockUi is true', () => {
    directive.layoutBlockUi = true;

    directive.ngAfterViewInit();

    expect(viewContainerRefMock.createEmbeddedView).toHaveBeenCalledWith(templateRefMock);
    expect(rendererMock.createElement).toHaveBeenCalledWith('div');
    expect(rendererMock.appendChild).toHaveBeenCalledWith(nativeElement, overlayElement);
  });

  it('should remove the overlay when layoutBlockUi is false', () => {
    // First, show the overlay
    directive.layoutBlockUi = true;
    directive.ngAfterViewInit();

    // Then, remove the overlay
    directive.layoutBlockUi = false;
    directive.ngOnChanges();

    expect(rendererMock.removeChild).toHaveBeenCalledWith(nativeElement, overlayElement);
    expect(directive['overlayElement']).toBeNull();
  });

  it('should clean up the overlay on destroy', () => {
    directive.layoutBlockUi = true;
    directive.ngAfterViewInit();

    directive.ngOnDestroy();

    expect(rendererMock.removeChild).toHaveBeenCalledWith(nativeElement, overlayElement);
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
});
