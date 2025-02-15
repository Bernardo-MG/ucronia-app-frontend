import { TemplateRef, ViewContainerRef, Renderer2, ElementRef } from '@angular/core';
import { PlaceholderDirective } from './placeholder.directive';

describe('PlaceholderDirective', () => {
  let directive: PlaceholderDirective;
  let templateRefMock: jasmine.SpyObj<TemplateRef<any>>;
  let viewContainerRefMock: jasmine.SpyObj<ViewContainerRef>;
  let rendererMock: jasmine.SpyObj<Renderer2>;
  let nativeElement: HTMLElement;

  beforeEach(() => {
    templateRefMock = jasmine.createSpyObj('TemplateRef', ['elementRef']);
    viewContainerRefMock = jasmine.createSpyObj('ViewContainerRef', ['createEmbeddedView', 'clear']);
    rendererMock = jasmine.createSpyObj('Renderer2', ['createElement', 'appendChild', 'removeChild', 'addClass', 'setProperty']);
    nativeElement = document.createElement('div');

    // Setting up the directive with mocked dependencies
    directive = new PlaceholderDirective(rendererMock, viewContainerRefMock, templateRefMock);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should show the placeholder when layoutPlaceholder is true', () => {
    // Mock createElement to return a new div element
    const placeholderDiv = document.createElement('div');
    rendererMock.createElement.and.returnValue(placeholderDiv);

    directive.layoutPlaceholder = true;
    directive.ngOnChanges();

    expect(viewContainerRefMock.clear).toHaveBeenCalled();
    expect(rendererMock.createElement).toHaveBeenCalledWith('div');

    // Check classes are added to placeholderElement
    expect(rendererMock.addClass).toHaveBeenCalledWith(placeholderDiv, 'placeholder-glow');
    expect(rendererMock.addClass).toHaveBeenCalledWith(placeholderDiv, 'd-flex');
    expect(rendererMock.addClass).toHaveBeenCalledWith(placeholderDiv, 'flex-column');

    // Check if the placeholder was appended correctly
    expect(rendererMock.appendChild).toHaveBeenCalledWith(nativeElement, jasmine.any(HTMLElement)); // Validate it appends a new element
    expect(nativeElement.innerHTML).toBe(''); // Ensure original content is cleared
  });

  it('should show the content when layoutPlaceholder is false', () => {
    directive.layoutPlaceholder = false;
    directive.ngOnChanges();

    expect(viewContainerRefMock.clear).toHaveBeenCalled();
    expect(viewContainerRefMock.createEmbeddedView).toHaveBeenCalledWith(templateRefMock);
  });

  it('should toggle between placeholder and content correctly', () => {
    // Initially set to show the placeholder
    directive.layoutPlaceholder = true;
    directive.ngOnChanges();

    // Toggle to show content
    directive.layoutPlaceholder = false;
    directive.ngOnChanges();

    expect(viewContainerRefMock.clear).toHaveBeenCalledTimes(2); // Should clear again
    expect(viewContainerRefMock.createEmbeddedView).toHaveBeenCalledWith(templateRefMock);
    expect(directive['placeholderElement']).toBeNull(); // Ensure placeholder is removed
  });

  it('should remove the placeholder element when layoutPlaceholder changes to false', () => {
    // Mock createElement to return a new div element
    const placeholderDiv = document.createElement('div');
    rendererMock.createElement.and.returnValue(placeholderDiv);

    // Set layoutPlaceholder to true to create the placeholder
    directive.layoutPlaceholder = true;
    directive.ngOnChanges();

    // Ensure that the placeholderElement has been created
    expect(directive['placeholderElement']).toBeDefined();

    // Now change to hide the placeholder
    directive.layoutPlaceholder = false; 
    directive.ngOnChanges();

    // Ensure that placeholderElement is set to null after removal
    expect(directive['placeholderElement']).toBeNull();
  });

});
