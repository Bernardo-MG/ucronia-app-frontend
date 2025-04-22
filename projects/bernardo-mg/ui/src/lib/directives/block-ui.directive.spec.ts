import { EmbeddedViewRef, Renderer2, TemplateRef, ViewContainerRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { BlockUiDirective } from './block-ui.directive';

describe('BlockUiDirective', () => {
  let directive: BlockUiDirective;
  let templateRefMock: jasmine.SpyObj<TemplateRef<any>>;
  let viewContainerRefMock: jasmine.SpyObj<ViewContainerRef>;
  let rendererMock: jasmine.SpyObj<Renderer2>;
  let nativeElement: HTMLElement;
  let embeddedViewRefMock: jasmine.SpyObj<EmbeddedViewRef<any>>;

  beforeEach(() => {
    // Create mocks for the dependencies
    templateRefMock = jasmine.createSpyObj('TemplateRef', ['elementRef']);
    viewContainerRefMock = jasmine.createSpyObj('ViewContainerRef', ['createEmbeddedView', 'clear']);
    rendererMock = jasmine.createSpyObj('Renderer2', ['createElement', 'setStyle', 'appendChild', 'removeChild']);

    // Create the DOM element to be used in the tests
    nativeElement = document.createElement('div');

    // Mock createElement to return a new div element
    rendererMock.createElement.and.callFake((tagName: string) => document.createElement(tagName));

    // Create an EmbeddedViewRef mock with rootNodes containing the native element
    embeddedViewRefMock = jasmine.createSpyObj('EmbeddedViewRef', [], { rootNodes: [nativeElement] });

    // Mock the ViewContainerRef to return the EmbeddedViewRef mock
    viewContainerRefMock.createEmbeddedView.and.returnValue(embeddedViewRefMock);

    // Configure the TestBed to provide mocks via DI and declare the directive
    TestBed.configureTestingModule({
      providers: [
        BlockUiDirective,
        { provide: TemplateRef, useValue: templateRefMock },
        { provide: ViewContainerRef, useValue: viewContainerRefMock },
        { provide: Renderer2, useValue: rendererMock }
      ]
    });

    // Initialize the directive and inject the mocks via DI
    directive = TestBed.inject(BlockUiDirective);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should show the overlay when uiBlock is set to true', () => {
    // Trigger the setter by setting uiBlock to true
    directive.uiBlock = true;

    expect(viewContainerRefMock.createEmbeddedView).toHaveBeenCalledWith(templateRefMock);
    expect(rendererMock.createElement).toHaveBeenCalledWith('div');
    expect(rendererMock.appendChild).toHaveBeenCalledWith(nativeElement, jasmine.any(HTMLElement));
    expect(directive['overlayElement']).toBeTruthy();
  });

  it('should hide the overlay when uiBlock is set to false', () => {
    // First, show the overlay by setting uiBlock to true
    directive.uiBlock = true;

    // Now hide the overlay
    const currentOverlay = directive['overlayElement'];
    directive.uiBlock = false;

    expect(rendererMock.removeChild).toHaveBeenCalledWith(nativeElement, currentOverlay);
    expect(directive['overlayElement']).toBeNull();
  });

  it('should clean up the overlay when the directive is destroyed', () => {
    // Show the overlay before destroying
    directive.uiBlock = true;

    const currentOverlay = directive['overlayElement'];
    directive.ngOnDestroy();

    expect(rendererMock.removeChild).toHaveBeenCalledWith(nativeElement, currentOverlay);
    expect(directive['overlayElement']).toBeNull();
  });

  it('should not attempt to remove the overlay if it does not exist', () => {
    // Try to remove the overlay without showing it
    directive.uiBlock = false;
    directive.ngOnDestroy();

    expect(rendererMock.removeChild).not.toHaveBeenCalled();
  });

  it('should set position to relative if position is static', () => {
    // Simulate the condition where the position style is static
    spyOn(window, 'getComputedStyle').and.returnValue({ position: 'static' } as CSSStyleDeclaration);

    directive.uiBlock = true;

    // Position should be set to relative
    expect(rendererMock.setStyle).toHaveBeenCalledWith(nativeElement, 'position', 'relative');
  });

  it('should not change position if it is already relative, absolute, or fixed', () => {
    // Simulate the condition where the position style is already relative
    spyOn(window, 'getComputedStyle').and.returnValue({ position: 'relative' } as CSSStyleDeclaration);

    directive.uiBlock = true;

    // No need to set position since it is already relative
    expect(rendererMock.setStyle).not.toHaveBeenCalledWith(nativeElement, 'position', 'relative');
  });

  it('should not recreate the embedded view on subsequent changes', () => {
    directive.uiBlock = true;

    // Trigger the setter again with the same value
    directive.uiBlock = false;
    directive.uiBlock = true;

    // Create view should be called only once
    expect(viewContainerRefMock.createEmbeddedView).toHaveBeenCalledTimes(1);
  });
});
