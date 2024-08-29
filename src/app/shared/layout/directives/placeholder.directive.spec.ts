import { TemplateRef, ViewContainerRef, Renderer2, ElementRef, SimpleChanges } from '@angular/core';
import { PlaceholderDirective } from './placeholder.directive';

describe('PlaceholderDirective', () => {
  let directive: PlaceholderDirective;
  let templateRefMock: jasmine.SpyObj<TemplateRef<any>>;
  let viewContainerRefMock: jasmine.SpyObj<ViewContainerRef>;
  let rendererMock: jasmine.SpyObj<Renderer2>;
  let elementRefMock: jasmine.SpyObj<ElementRef>;
  let nativeElement: HTMLElement;

  beforeEach(() => {
    templateRefMock = jasmine.createSpyObj('TemplateRef', ['elementRef']);
    viewContainerRefMock = jasmine.createSpyObj('ViewContainerRef', ['createEmbeddedView', 'clear']);
    rendererMock = jasmine.createSpyObj('Renderer2', ['createElement', 'appendChild', 'removeChild', 'addClass']);
    nativeElement = document.createElement('div');
    elementRefMock = jasmine.createSpyObj('ElementRef', [], { nativeElement });

    directive = new PlaceholderDirective(rendererMock, elementRefMock, templateRefMock, viewContainerRefMock);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should show the placeholder when layoutPlaceholder is true', () => {
    directive.layoutPlaceholder = true;
    directive.ngOnChanges({} as SimpleChanges);

    expect(viewContainerRefMock.clear).toHaveBeenCalled();
    expect(rendererMock.createElement).toHaveBeenCalledWith('div');
    expect(rendererMock.addClass).toHaveBeenCalled();
    expect(nativeElement.innerHTML).not.toContain('John Doe');
  });

  it('should show the content when layoutPlaceholder is false', () => {
    directive.layoutPlaceholder = false;
    directive.ngOnChanges({} as SimpleChanges);

    expect(viewContainerRefMock.clear).toHaveBeenCalled();
    if (templateRefMock) {
      expect(viewContainerRefMock.createEmbeddedView).toHaveBeenCalledWith(templateRefMock);
    }
  });

  it('should toggle between placeholder and content correctly', () => {
    // Initially set to show the placeholder
    directive.layoutPlaceholder = true;
    directive.ngOnChanges({} as SimpleChanges);

    expect(viewContainerRefMock.clear).toHaveBeenCalled();
    expect(nativeElement.innerHTML).not.toContain('John Doe');

    // Toggle to show content
    directive.layoutPlaceholder = false;
    directive.ngOnChanges({} as SimpleChanges);

    expect(viewContainerRefMock.clear).toHaveBeenCalled();
    if (templateRefMock) {
      expect(viewContainerRefMock.createEmbeddedView).toHaveBeenCalledWith(templateRefMock);
    }
  });

  it('should remove the placeholder element when layoutPlaceholder changes to false', () => {
    // Mock createElement to return a new div element
    rendererMock.createElement.and.callFake((tagName: string) => {
      return document.createElement(tagName);
    });

    // Set layoutPlaceholder to true to create the placeholder
    directive.layoutPlaceholder = true;
    directive.ngOnChanges({ layoutPlaceholder: {} } as unknown as SimpleChanges);

    // Ensure that the placeholderElement has been created and added
    expect(rendererMock.appendChild).toHaveBeenCalledWith(nativeElement, directive['placeholderElement']);
    expect(directive['placeholderElement']).toBeDefined(); // Ensure placeholderElement is defined

    // Now change to hide the placeholder
    directive.layoutPlaceholder = false; 
    directive.ngOnChanges({ layoutPlaceholder: {} } as unknown as SimpleChanges);

    // Ensure that placeholderElement is set to null after removal
    expect(directive['placeholderElement']).toBeNull();
});

  it('should handle cases where no templateRef is provided', () => {
    // Instantiate directive without a templateRef
    directive = new PlaceholderDirective(rendererMock, elementRefMock, null as any, viewContainerRefMock);

    directive.layoutPlaceholder = true;
    directive.ngOnChanges({} as SimpleChanges);

    expect(viewContainerRefMock.clear).toHaveBeenCalled();

    directive.layoutPlaceholder = false;
    directive.ngOnChanges({} as SimpleChanges);

    // No placeholder element to remove since templateRef is null
    expect(rendererMock.removeChild).not.toHaveBeenCalled();
    expect(viewContainerRefMock.createEmbeddedView).not.toHaveBeenCalled();
  });
});
