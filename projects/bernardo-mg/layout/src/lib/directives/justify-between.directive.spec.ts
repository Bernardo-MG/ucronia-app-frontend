import { ElementRef, Renderer2 } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { JustifyBetweenDirective } from '../../../../../../src/app/shared/style/directives/justify-between.directive';

describe('JustifyBetweenDirective', () => {
  let directive: JustifyBetweenDirective;
  let elementRefMock: ElementRef;
  let rendererMock: Renderer2;
  
  beforeEach(() => {
    elementRefMock = new ElementRef(document.createElement('div'));
    rendererMock = jasmine.createSpyObj('Renderer2', ['addClass']);

    TestBed.configureTestingModule({
      providers: [
        JustifyBetweenDirective,
        { provide: ElementRef, useValue: elementRefMock },
        { provide: Renderer2, useValue: rendererMock }
      ]
    });

    directive = TestBed.inject(JustifyBetweenDirective);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });
});
