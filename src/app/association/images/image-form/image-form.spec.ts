import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Asset } from '@ucronia/domain';
import { ImageForm } from './image-form';
import { provideZonelessChangeDetection } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

describe('ImageForm', () => {
  let component: ImageForm;
  let fixture: ComponentFixture<ImageForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [ImageForm] }).compileComponents();
    fixture = TestBed.createComponent(ImageForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());

  it('should load image metadata for editing', () => {
    const image = Object.assign(new Asset(), {
      number: 2, name: 'Poster', description: 'Event poster', publicAccess: false
    });
    fixture.componentRef.setInput('data', image);
    fixture.detectChanges();
    expect(component.form.get('name')?.value).toBe('Poster');
    expect(component.form.get('description')?.value).toBe('Event poster');
    expect(component.form.get('publicAccess')?.value).toBeFalse();
  });

  it('should default new images to public access', () => {
    expect(component.form.get('publicAccess')?.value).toBeTrue();
  });
});

describe('ImageForm form submission', () => {
  const scenario = { values: { name: 'Club photo', description: 'Members' }, invalid: 'name', expected: jasmine.objectContaining({ image: jasmine.objectContaining({ name: 'Club photo' }), file: jasmine.any(File) }) };

  let fixture: ComponentFixture<ImageForm>;
  let component: ImageForm;
  let emitted: jasmine.Spy;
  let form: FormGroup;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ImageForm],
      providers: [
        provideZonelessChangeDetection(),
        provideNoopAnimations()
      ]
    });
    fixture = TestBed.createComponent(ImageForm);
    component = fixture.componentInstance;
    form = component.form as FormGroup;
    fixture.componentRef.setInput('showActions', false);
    fixture.componentRef.setInput('formId', 'form-contract');

    form.patchValue(scenario.values);
    component.file = new File(['contents'], 'example.txt');
    form.markAsPristine();
    emitted = spyOn(component.save, 'emit');
    fixture.detectChanges();
    expect(form.valid).withContext('explicit fixture must be valid').toBeTrue();
  });

  function edit(): void {
    form.markAsDirty();
  }

  function submit(): void {
    fixture.nativeElement.querySelector('form').dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
  }

  it('does not submit valid unchanged data', () => {
    expect(component.saveEnabled).toBeFalse();
    submit();
    expect(emitted).not.toHaveBeenCalled();
  });

  it('emits the public payload once through native submission', () => {
    edit();
    submit();
    expect(emitted).toHaveBeenCalledOnceWith(scenario.expected);
  });

  it('blocks loading submissions and allows retry with the preserved edits', () => {
    edit();
    fixture.componentRef.setInput('loading', true);
    expect(component.formStatus.loading).toBeTrue();
    expect(form.disabled).toBeTrue();
    submit();
    expect(emitted).not.toHaveBeenCalled();
    fixture.componentRef.setInput('loading', false);
    expect(form.enabled).toBeTrue();
    expect(form.dirty).toBeTrue();
    submit();
    expect(emitted).toHaveBeenCalledOnceWith(scenario.expected);
  });

  it('rejects a real invalid field and exposes its validation state', () => {
    form.get(scenario.invalid)!.setValue(null);
    edit();
    expect(form.invalid).toBeTrue();
    submit();
    expect(form.get(scenario.invalid)!.touched).toBeTrue();
    expect(emitted).not.toHaveBeenCalled();
  });

  it('hides inline actions when the drawer owns them', () => {
    expect(fixture.nativeElement.querySelector('[data-action="submit"]')).toBeNull();
    expect(fixture.nativeElement.querySelector('[data-action="cancel"]')).toBeNull();
  });

  it('cancels inline editing without submitting', () => {
    const cancelled = spyOn(component.cancelEdition, 'emit');
    fixture.componentRef.setInput('showActions', true);
    fixture.detectChanges();
    fixture.nativeElement.querySelector('[data-action="cancel"]').click();
    expect(cancelled).toHaveBeenCalledTimes(1);
    expect(emitted).not.toHaveBeenCalled();
  });
});
