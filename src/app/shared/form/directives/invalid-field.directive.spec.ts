import { ElementRef, Renderer2 } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormControl, FormGroupDirective, FormsModule, NgControl, ReactiveFormsModule } from '@angular/forms';
import { InvalidFieldDirective } from './invalid-field.directive';

describe('InvalidFieldDirective', () => {
  let directive: InvalidFieldDirective;
  let elementRefMock: ElementRef;
  let rendererMock: Renderer2;
  let ngControlMock: NgControl;
  let formGroupDirectiveMock: FormGroupDirective;

  beforeEach(() => {
    elementRefMock = new ElementRef(document.createElement('div'));
    rendererMock = jasmine.createSpyObj('Renderer2', ['addClass', 'removeClass']);

    ngControlMock = {
      control: null,
    } as NgControl;

    formGroupDirectiveMock = {
      form: {
        get: jasmine.createSpy('get').and.callFake((controlName: string) => {
          // Return a mock FormControl if the control name matches
          if (controlName === 'name.firstName') {
            return new FormControl('', { updateOn: 'blur' });
          }
          return null;
        })
      }
    } as unknown as FormGroupDirective;  // Use `as unknown as` to bypass strict type checking

    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [
        InvalidFieldDirective,
        { provide: ElementRef, useValue: elementRefMock },
        { provide: Renderer2, useValue: rendererMock },
        { provide: NgControl, useValue: ngControlMock },
        { provide: FormGroupDirective, useValue: formGroupDirectiveMock }
      ]
    });

    directive = TestBed.inject(InvalidFieldDirective);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

});
