import { TestBed } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MemberCreationForm } from './member-creation-form';

describe('MemberCreationForm', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [MemberCreationForm], providers: [provideAnimationsAsync()]
  }));

  it('starts active and renewing with an empty birth date and required fee', () => {
    const fixture = TestBed.createComponent(MemberCreationForm);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    expect(component.form.controls.birthDate.value).toBeNull();
    expect(component.form.controls.active.value).toBeTrue();
    expect(component.form.controls.renew.value).toBeTrue();
    expect(component.form.controls.feeType.valid).toBeFalse();
    expect(fixture.nativeElement.querySelector('p-selectbutton')).toBeNull();
  });

  it('emits a complete creation request with scalar lookup numbers', () => {
    const component = TestBed.createComponent(MemberCreationForm).componentInstance;
    const save = jasmine.createSpy();
    component.save.subscribe(save);
    component.form.patchValue({ feeType: 3, name: { firstName: 'Alice' }, key: 5, address: 'Street' });
    component.addContactChannel();
    component.contactChannels.at(0).patchValue({ method: 4, detail: 'alice@example.org' });
    component.form.markAsDirty();
    component.onSave();
    expect(save).toHaveBeenCalledWith(jasmine.objectContaining({
      feeType: 3, key: 5, address: 'Street', birthDate: undefined,
      active: true, renew: true, contactChannels: [{ method: 4, detail: 'alice@example.org' }]
    }));
  });

  it('does not submit while loading or with an incomplete contact channel', () => {
    const component = TestBed.createComponent(MemberCreationForm).componentInstance;
    const save = jasmine.createSpy();
    component.save.subscribe(save);
    component.form.patchValue({ feeType: 3, name: { firstName: 'Alice' } });
    component.form.markAsDirty();
    component.loading = true;
    component.onSave();
    component.loading = false;
    component.addContactChannel();
    component.onSave();
    expect(save).not.toHaveBeenCalled();
  });
});
