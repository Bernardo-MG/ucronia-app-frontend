import { Renderer2, TemplateRef, ViewContainerRef, EmbeddedViewRef } from '@angular/core';
import { PlaceholderDirective } from './placeholder.directive';
import { TestBed } from '@angular/core/testing';

describe('PlaceholderDirective', () => {
  let directive: PlaceholderDirective;
  let templateRefMock: jasmine.SpyObj<TemplateRef<any>>;
  let viewContainerRefMock: jasmine.SpyObj<ViewContainerRef>;
  let rendererMock: jasmine.SpyObj<Renderer2>;
  let embeddedViewMock: jasmine.SpyObj<EmbeddedViewRef<any>>;
  let placeholderDiv: HTMLElement;

  beforeEach(() => {
    // Mock the necessary services
    templateRefMock = jasmine.createSpyObj('TemplateRef', ['elementRef']);
    viewContainerRefMock = jasmine.createSpyObj('ViewContainerRef', ['createEmbeddedView', 'clear']);
    rendererMock = jasmine.createSpyObj('Renderer2', ['createElement', 'appendChild', 'removeChild', 'addClass', 'setProperty']);

    // Mock the EmbeddedViewRef to simulate rootNodes
    embeddedViewMock = jasmine.createSpyObj('EmbeddedViewRef', ['rootNodes']);

    // Mock rootNodes as an array containing a div element
    const mockRootNode = document.createElement('div');
    Object.defineProperty(embeddedViewMock, 'rootNodes', {
      get: () => [mockRootNode],
    });

    // Mock the renderer to create a placeholder div element
    placeholderDiv = document.createElement('div');
    rendererMock.createElement.and.returnValue(placeholderDiv);

    // Configure the TestBed to provide mocks via DI and declare the directive
    TestBed.configureTestingModule({
      providers: [
        PlaceholderDirective,
        { provide: TemplateRef, useValue: templateRefMock },
        { provide: ViewContainerRef, useValue: viewContainerRefMock },
        { provide: Renderer2, useValue: rendererMock }
      ]
    });

    // Initialize the directive and inject the mocks via DI
    directive = TestBed.inject(PlaceholderDirective);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should show the placeholder when uiPlaceholder is true', () => {
    // Trigger uiPlaceholder to true
    directive.uiPlaceholder = true;

    // Ensure the view container is cleared before inserting content
    expect(viewContainerRefMock.clear).toHaveBeenCalled();

    // Create the embedded view
    viewContainerRefMock.createEmbeddedView.and.returnValue(embeddedViewMock);

    // Ensure placeholder is created with proper classes
    expect(rendererMock.createElement).toHaveBeenCalledWith('div');
    expect(rendererMock.addClass).toHaveBeenCalledWith(placeholderDiv, 'placeholder-glow');
    expect(rendererMock.addClass).toHaveBeenCalledWith(placeholderDiv, 'd-flex');
    expect(rendererMock.addClass).toHaveBeenCalledWith(placeholderDiv, 'flex-column');

    // Ensure placeholder is inserted into the view container
    expect(rendererMock.appendChild).toHaveBeenCalledWith(embeddedViewMock.rootNodes[0], placeholderDiv);
  });

  it('should show the content when uiPlaceholder is false', () => {
    // Trigger uiPlaceholder to false
    directive.uiPlaceholder = false;

    // Ensure the view container is cleared and embedded view is recreated
    expect(viewContainerRefMock.clear).toHaveBeenCalled();
    expect(viewContainerRefMock.createEmbeddedView).toHaveBeenCalledWith(templateRefMock);
  });

  it('should toggle between placeholder and content correctly', () => {
    // Set uiPlaceholder to true and trigger content change
    directive.uiPlaceholder = true;
    directive.uiPlaceholder = false;

    // Ensure the view is cleared twice (once for placeholder and once for content)
    expect(viewContainerRefMock.clear).toHaveBeenCalledTimes(2);
    expect(viewContainerRefMock.createEmbeddedView).toHaveBeenCalledWith(templateRefMock);
    expect(directive['placeholderElement']).toBeNull(); // Ensure the placeholder is removed
  });

});
