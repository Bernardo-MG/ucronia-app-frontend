import { ElementRef, Renderer2 } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { InvalidFieldDirective } from './invalid-field.directive';

describe('InvalidFieldDirective', () => {
  let directive: InvalidFieldDirective;
  let elementRefMock: ElementRef;
  let rendererMock: Renderer2;
  
  beforeEach(() => {
    elementRefMock = new ElementRef(document.createElement('div'));
    rendererMock = jasmine.createSpyObj('Renderer2', ['addClass']);

    TestBed.configureTestingModule({
      providers: [
        InvalidFieldDirective,
        { provide: ElementRef, useValue: elementRefMock },
        { provide: Renderer2, useValue: rendererMock }
      ]
    });

    directive = TestBed.inject(InvalidFieldDirective);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });
});
