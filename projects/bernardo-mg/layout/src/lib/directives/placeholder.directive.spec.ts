import { Renderer2, TemplateRef, ViewContainerRef, EmbeddedViewRef } from '@angular/core';
import { PlaceholderDirective } from './placeholder.directive';

describe('PlaceholderDirective', () => {
  let directive: PlaceholderDirective;
  let templateRefMock: jasmine.SpyObj<TemplateRef<any>>;
  let viewContainerRefMock: jasmine.SpyObj<ViewContainerRef>;
  let rendererMock: jasmine.SpyObj<Renderer2>;
  let embeddedViewMock: jasmine.SpyObj<EmbeddedViewRef<any>>;
  let nativeElement: HTMLElement;

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

    // Setting up the directive with mocked dependencies
    directive = new PlaceholderDirective(rendererMock, viewContainerRefMock, templateRefMock);
    nativeElement = document.createElement('div');
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should show the placeholder when layoutPlaceholder is true', () => {
    const placeholderDiv = document.createElement('div');
    rendererMock.createElement.and.returnValue(placeholderDiv);

    directive.layoutPlaceholder = true;
    directive.ngOnChanges();

    // Ensure the view is cleared before inserting content
    expect(viewContainerRefMock.clear).toHaveBeenCalled();

    // Check that the placeholder div is created and added with correct classes
    expect(rendererMock.createElement).toHaveBeenCalledWith('div');
    expect(rendererMock.addClass).toHaveBeenCalledWith(placeholderDiv, 'placeholder-glow');
    expect(rendererMock.addClass).toHaveBeenCalledWith(placeholderDiv, 'd-flex');
    expect(rendererMock.addClass).toHaveBeenCalledWith(placeholderDiv, 'flex-column');

    // Check if placeholder is appended to the view container
    expect(rendererMock.appendChild).toHaveBeenCalled();
    expect(nativeElement.innerHTML).toBe(''); // Check that the content is cleared
  });

  it('should show the content when layoutPlaceholder is false', () => {
    directive.layoutPlaceholder = false;
    directive.ngOnChanges();

    // Verify that placeholder was cleared and content was inserted
    expect(viewContainerRefMock.clear).toHaveBeenCalled();
    expect(viewContainerRefMock.createEmbeddedView).toHaveBeenCalledWith(templateRefMock);
  });

  it('should toggle between placeholder and content correctly', () => {
    // Set layoutPlaceholder to true and trigger ngOnChanges
    directive.layoutPlaceholder = true;
    directive.ngOnChanges();

    // Then set it to false and trigger ngOnChanges again
    directive.layoutPlaceholder = false;
    directive.ngOnChanges();

    // Ensure that the view is cleared and the embedded view is recreated
    expect(viewContainerRefMock.clear).toHaveBeenCalledTimes(2);
    expect(viewContainerRefMock.createEmbeddedView).toHaveBeenCalledWith(templateRefMock);
    expect(directive['placeholderElement']).toBeNull(); // Check that the placeholder is removed
  });

  it('should remove the placeholder element when layoutPlaceholder changes to false', () => {
    const placeholderDiv = document.createElement('div');
    rendererMock.createElement.and.returnValue(placeholderDiv);

    // Set layoutPlaceholder to true to create the placeholder
    directive.layoutPlaceholder = true;
    directive.ngOnChanges();

    // Ensure that the placeholderElement has been created
    expect(directive['placeholderElement']).toBeDefined();

    // Now change layoutPlaceholder to false to remove the placeholder
    directive.layoutPlaceholder = false;
    directive.ngOnChanges();

    // Ensure that the placeholderElement is null after removal
    expect(directive['placeholderElement']).toBeNull();
  });

  it('should insert the placeholder into the root node of the embedded view', () => {
    const placeholderDiv = document.createElement('div');
    rendererMock.createElement.and.returnValue(placeholderDiv);

    // Return the mock embedded view
    viewContainerRefMock.createEmbeddedView.and.returnValue(embeddedViewMock);

    directive.layoutPlaceholder = true;
    directive.ngOnChanges();

    // Check if the view was cleared first
    expect(viewContainerRefMock.clear).toHaveBeenCalled();

    // Ensure the embedded view is created
    expect(viewContainerRefMock.createEmbeddedView).toHaveBeenCalledWith(templateRefMock);

    // Check if the placeholder is inserted into the first root node
    const mockRootNode = embeddedViewMock.rootNodes[0];
    expect(rendererMock.setProperty).toHaveBeenCalledWith(mockRootNode, 'innerHTML', ''); // Clear original content
    expect(rendererMock.appendChild).toHaveBeenCalledWith(mockRootNode, placeholderDiv); // Append the placeholder to the root node
  });
});
