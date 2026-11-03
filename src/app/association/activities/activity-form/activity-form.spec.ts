import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Asset } from '@ucronia/domain';
import { of } from 'rxjs';
import { ImageService } from '../../images/image-service';
import { ActivityForm } from './activity-form';
import { provideZonelessChangeDetection } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

describe('ActivityForm', () => {
  let component: ActivityForm;
  let fixture: ComponentFixture<ActivityForm>;
  const image = Object.assign(new Asset(), { number: 4, name: 'Image' });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivityForm],
      providers: [{
        provide: ImageService,
        useValue: {
          getAllForSelection: jasmine.createSpy().and.returnValue(of([image])),
          content: jasmine.createSpy().and.returnValue(of(new Blob())),
          contentUrl: jasmine.createSpy().and.returnValue('/images/4/content')
        }
      }]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ActivityForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should expose the image number for authenticated selector thumbnails', () => {
    expect(component.imageOptions[0].number).toBe(image.number);
  });

  it('should preserve the image URL used by the activity payload', () => {
    expect(component.imageOptions[0].url).toBe('/images/4/content');
  });

  it('should emit the selected image URL when saving', () => {
    const date = new Date(2026, 0, 1, 18, 0);
    let savedImage: string | undefined;
    component.save.subscribe(activity => savedImage = activity.image);
    component.form.patchValue({
      title: 'Activity',
      image: component.imageOptions[0].url,
      dates: [{ day: date, startHour: date, endHour: date }]
    });
    component.form.markAsDirty();

    component.onSave();

    expect(savedImage).toBe('/images/4/content');
  });
});

describe('ActivityForm form submission', () => {
  const date = new Date(2026, 0, 15, 12);
  const scenario = { values: { title: 'Club meeting', dates: [{ day: date, startHour: date, endHour: date }] }, invalid: 'title', expected: jasmine.objectContaining({ title: 'Club meeting', dates: [{ start: date, end: date }] }) };

  let fixture: ComponentFixture<ActivityForm>;
  let component: ActivityForm;
  let emitted: jasmine.Spy;
  let form: FormGroup;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ActivityForm],
      providers: [
        provideZonelessChangeDetection(),
        provideNoopAnimations(),
        { provide: ImageService, useValue: { getAllForSelection: () => of([]) } }
      ]
    });
    fixture = TestBed.createComponent(ActivityForm);
    component = fixture.componentInstance;
    form = component.form as FormGroup;
    fixture.componentRef.setInput('showActions', false);
    fixture.componentRef.setInput('formId', 'form-contract');

    form.patchValue(scenario.values);

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
