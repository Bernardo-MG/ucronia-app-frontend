import { ElementRef, Renderer2 } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ResponsiveShortColumnsDirective } from './responsive-columns.directive';

describe('ResponsiveShortColumnsDirective', () => {
  let directive: ResponsiveShortColumnsDirective;
  let elementRefMock: ElementRef;
  let rendererMock: Renderer2;
  
  beforeEach(() => {
    elementRefMock = new ElementRef(document.createElement('div'));
    rendererMock = jasmine.createSpyObj('Renderer2', ['addClass']);

    TestBed.configureTestingModule({
      providers: [
        ResponsiveShortColumnsDirective,
        { provide: ElementRef, useValue: elementRefMock },
        { provide: Renderer2, useValue: rendererMock }
      ]
    });

    directive = TestBed.inject(ResponsiveShortColumnsDirective);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });
});
