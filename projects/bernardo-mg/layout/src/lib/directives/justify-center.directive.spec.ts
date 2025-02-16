import { ElementRef, Renderer2 } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { JustifyCenterDirective } from './justify-center.directive';

describe('JustifyCenterDirective', () => {
  let directive: JustifyCenterDirective;
  let elementRefMock: ElementRef;
  let rendererMock: Renderer2;
  
  beforeEach(() => {
    elementRefMock = new ElementRef(document.createElement('div'));
    rendererMock = jasmine.createSpyObj('Renderer2', ['addClass']);

    TestBed.configureTestingModule({
      providers: [
        JustifyCenterDirective,
        { provide: ElementRef, useValue: elementRefMock },
        { provide: Renderer2, useValue: rendererMock }
      ]
    });

    directive = TestBed.inject(JustifyCenterDirective);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });
});
