import { ElementRef, Renderer2 } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { JustifyEndDirective } from '../../../../../../src/app/shared/style/directives/justify-end.directive';

describe('JustifyEndDirective', () => {
  let directive: JustifyEndDirective;
  let elementRefMock: ElementRef;
  let rendererMock: Renderer2;
  
  beforeEach(() => {
    elementRefMock = new ElementRef(document.createElement('div'));
    rendererMock = jasmine.createSpyObj('Renderer2', ['addClass']);

    TestBed.configureTestingModule({
      providers: [
        JustifyEndDirective,
        { provide: ElementRef, useValue: elementRefMock },
        { provide: Renderer2, useValue: rendererMock }
      ]
    });

    directive = TestBed.inject(JustifyEndDirective);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });
});
