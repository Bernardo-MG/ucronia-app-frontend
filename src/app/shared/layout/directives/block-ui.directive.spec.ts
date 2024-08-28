import { TemplateRef, ViewContainerRef, Renderer2, ElementRef } from '@angular/core';
import { BlockUiDirective } from './block-ui.directive';

describe('BlockUiDirective', () => {
  let directive: BlockUiDirective;
  let templateRefMock: jasmine.SpyObj<TemplateRef<any>>;
  let viewContainerRefMock: jasmine.SpyObj<ViewContainerRef>;
  let rendererMock: jasmine.SpyObj<Renderer2>;
  let elementRefMock: jasmine.SpyObj<ElementRef>;

  beforeEach(() => {
    templateRefMock = jasmine.createSpyObj('TemplateRef', ['elementRef']);
    viewContainerRefMock = jasmine.createSpyObj('ViewContainerRef', ['createEmbeddedView', 'clear']);
    rendererMock = jasmine.createSpyObj('Renderer2', ['createElement', 'setStyle', 'appendChild', 'removeChild']);
    elementRefMock = jasmine.createSpyObj('ElementRef', [], { nativeElement: document.createElement('div') });

    directive = new BlockUiDirective(templateRefMock, viewContainerRefMock, rendererMock, elementRefMock);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should show overlay when appBlockUi is true', () => {
    directive.appBlockUi = true;

    directive.ngAfterViewInit();

    expect(viewContainerRefMock.createEmbeddedView).toHaveBeenCalledWith(templateRefMock);
    expect(rendererMock.createElement).toHaveBeenCalledWith('div');
    expect(rendererMock.setStyle).toHaveBeenCalled();
    expect(rendererMock.appendChild).toHaveBeenCalledWith(elementRefMock.nativeElement.parentElement, jasmine.anything());
  });

  it('should remove overlay when appBlockUi is false', () => {
    directive.appBlockUi = true;
    directive.ngAfterViewInit(); // First, add the overlay

    directive.appBlockUi = false;
    directive.ngOnChanges(); // Then, remove the overlay

    expect(viewContainerRefMock.clear).toHaveBeenCalled();
    expect(rendererMock.removeChild).toHaveBeenCalledWith(elementRefMock.nativeElement.parentElement, jasmine.anything());
  });

  it('should clean up overlay on destroy', () => {
    directive.appBlockUi = true;
    directive.ngAfterViewInit(); // Add the overlay

    directive.ngOnDestroy(); // Clean up

    expect(viewContainerRefMock.clear).toHaveBeenCalled();
    expect(rendererMock.removeChild).toHaveBeenCalled();
  });

});
