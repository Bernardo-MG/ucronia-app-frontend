import { TemplateRef, ViewContainerRef, Renderer2, ElementRef } from '@angular/core';
import { BlockUiDirective } from './block-ui.directive';

describe('BlockUiDirective', () => {
  let directive: BlockUiDirective;
  let templateRefMock: jasmine.SpyObj<TemplateRef<any>>;
  let viewContainerRefMock: jasmine.SpyObj<ViewContainerRef>;
  let rendererMock: jasmine.SpyObj<Renderer2>;
  let elementRefMock: jasmine.SpyObj<ElementRef>;
  let nativeElement: HTMLElement;
  let parentElement: HTMLElement;

  beforeEach(() => {
    templateRefMock = jasmine.createSpyObj('TemplateRef', ['elementRef']);
    viewContainerRefMock = jasmine.createSpyObj('ViewContainerRef', ['createEmbeddedView', 'clear']);
    rendererMock = jasmine.createSpyObj('Renderer2', ['createElement', 'setStyle', 'appendChild', 'removeChild']);

    // Create a native element and a parent element to simulate DOM structure
    nativeElement = document.createElement('div');
    parentElement = document.createElement('div');
    parentElement.appendChild(nativeElement);

    // Mock createElement to return a new div element
    rendererMock.createElement.and.callFake((tagName: string) => {
      return document.createElement(tagName);
    });

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
    expect(rendererMock.setStyle).toHaveBeenCalled();
    expect(rendererMock.appendChild).toHaveBeenCalledWith(parentElement, jasmine.anything());
  });

  it('should remove the overlay when layoutBlockUi is false', () => {
    // First, add the overlay
    directive.layoutBlockUi = true;
    directive.ngAfterViewInit();

    // Then, remove the overlay
    directive.layoutBlockUi = false;
    directive.ngOnChanges();

    expect(rendererMock.removeChild).toHaveBeenCalledWith(parentElement, jasmine.anything());
    expect(directive['overlayElement']).toBeNull();
  });

  it('should not re-create the overlay if it already exists', () => {
    directive.layoutBlockUi = true;

    // Add the overlay
    directive.ngAfterViewInit();

    const initialOverlayElement = directive['overlayElement'];

    // Try to add the overlay again
    directive.ngOnChanges();

    // The overlay element should not be re-created
    expect(directive['overlayElement']).toBe(initialOverlayElement);
  });

  it('should clean up the overlay on destroy', () => {
    // Add the overlay
    directive.layoutBlockUi = true;
    directive.ngAfterViewInit();

    // Ensure overlayElement is set correctly
    const overlayElement = directive['overlayElement'];

    // Clean up
    directive.ngOnDestroy();

    // Expect the renderer to remove the overlay element from the parent
    expect(rendererMock.removeChild).toHaveBeenCalledWith(parentElement, overlayElement);
    expect(directive['overlayElement']).toBeNull(); // Ensure overlayElement is reset
  });

  it('should not attempt to remove the overlay if it does not exist', () => {
    // No overlay should be created
    directive.layoutBlockUi = false;
    directive.ngOnChanges();

    // Attempt to clean up
    directive.ngOnDestroy();

    expect(rendererMock.removeChild).not.toHaveBeenCalled();
  });
});
