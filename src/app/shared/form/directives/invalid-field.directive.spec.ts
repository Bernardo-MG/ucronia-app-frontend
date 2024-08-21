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
      name: 'name.firstName'  // Mocking formControlName
    } as NgControl;

    formGroupDirectiveMock = {
      form: {
        get: jasmine.createSpy('get').and.callFake((controlName: string) => {
          if (controlName === 'name.firstName') {
            return new FormControl('', { updateOn: 'blur' });
          }
          return null;
        })
      }
    } as unknown as FormGroupDirective;

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

  it('should add "is-invalid" class if the control is invalid, dirty, and touched', () => {
    const formControl = new FormControl('', { updateOn: 'blur' });
    formControl.markAsDirty();
    formControl.markAsTouched();
    formControl.setErrors({ required: true });

    directive.appInvalidField = formControl;
    directive.ngOnInit();
    directive.updateFieldClass();

    expect(rendererMock.addClass).toHaveBeenCalledWith(elementRefMock.nativeElement, 'is-invalid');
  });

  it('should remove "is-invalid" class if the control is valid', () => {
    const formControl = new FormControl('', { updateOn: 'blur' });
    formControl.setErrors(null);

    directive.appInvalidField = formControl;
    directive.ngOnInit();
    directive.updateFieldClass();

    expect(rendererMock.removeClass).toHaveBeenCalledWith(elementRefMock.nativeElement, 'is-invalid');
  });

  it('should use formControlName when appInvalidField is not provided', () => {
    directive.appInvalidField = null; // Not providing appInvalidField
    directive.ngOnInit();
    directive.updateFieldClass();

    expect(formGroupDirectiveMock.form.get).toHaveBeenCalledWith('name.firstName');
  });

  it('should add "is-invalid" class when backendFailure is true', () => {
    directive.backendFailure = true;
    directive.updateFieldClass();

    expect(rendererMock.addClass).toHaveBeenCalledWith(elementRefMock.nativeElement, 'is-invalid');
  });

  it('should react to form control status changes', () => {
    const formControl = new FormControl('', { updateOn: 'blur' });
    formControl.markAsDirty();
    formControl.markAsTouched();

    directive.appInvalidField = formControl;
    directive.ngOnInit();

    formControl.setErrors({ required: true });
    formControl.updateValueAndValidity(); // Trigger statusChanges

    expect(rendererMock.addClass).toHaveBeenCalledWith(elementRefMock.nativeElement, 'is-invalid');

    formControl.setErrors(null);
    formControl.updateValueAndValidity(); // Trigger statusChanges

    expect(rendererMock.removeClass).toHaveBeenCalledWith(elementRefMock.nativeElement, 'is-invalid');
  });

  it('should retrieve the FormControl using the string passed to appInvalidField', () => {
    directive.appInvalidField = 'name.firstName';
    directive.ngOnInit();
    const control = directive.getFormControl();

    expect(formGroupDirectiveMock.form.get).toHaveBeenCalledWith('name.firstName');
    expect(control).toBeInstanceOf(FormControl);
  });

  it('should fall back to formControlName if appInvalidField is not provided', () => {
    directive.appInvalidField = null; // Not providing appInvalidField
    directive.ngOnInit();
    const control = directive.getFormControl();

    expect(formGroupDirectiveMock.form.get).toHaveBeenCalledWith('name.firstName');
    expect(control).toBeInstanceOf(FormControl);
  });

  it('should handle when appInvalidField is provided as a FormControl directly', () => {
    const formControl = new FormControl('');
    directive.appInvalidField = formControl;
    directive.ngOnInit();
    const control = directive.getFormControl();

    expect(control).toBe(formControl);
  });

  it('should remove "is-invalid" class when form control is valid on status change', () => {
    const formControl = new FormControl('', { updateOn: 'blur' });
    formControl.markAsDirty();
    formControl.markAsTouched();
    formControl.setErrors({ required: true });

    directive.appInvalidField = formControl;
    directive.ngOnInit();

    formControl.setErrors(null);
    formControl.updateValueAndValidity(); // Trigger statusChanges

    expect(rendererMock.removeClass).toHaveBeenCalledWith(elementRefMock.nativeElement, 'is-invalid');
  });
});
