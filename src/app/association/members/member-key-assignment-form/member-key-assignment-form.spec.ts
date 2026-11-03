import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MemberSearch } from '@app/shared/member/member-search/member-search';
import { PublicMember } from '@ucronia/domain';
import { MemberKeyAssignmentForm } from './member-key-assignment-form';

describe('MemberKeyAssignmentForm', () => {
  let fixture: ComponentFixture<MemberKeyAssignmentForm>;
  let component: MemberKeyAssignmentForm;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MemberKeyAssignmentForm],
      providers: [provideZonelessChangeDetection(), provideNoopAnimations()]
    });
    fixture = TestBed.createComponent(MemberKeyAssignmentForm);
    fixture.detectChanges();
    component = fixture.componentInstance;
    fixture.componentRef.setInput('members', [Object.assign(new PublicMember(), {
      number: 12,
      memberNumber: 37,
      name: { fullName: 'Ana López' }
    })]);
    fixture.detectChanges();
  });

  it('requires a member before submitting', () => {
    const save = spyOn(component.save, 'emit');

    component.onSave();

    expect(component.form.invalid).toBeTrue();
    expect(save).not.toHaveBeenCalled();
  });

  it('selects a search result and emits its profile number', () => {
    const save = spyOn(component.save, 'emit');

    component.onSelectMember(component.members()[0]);
    component.onSave();

    expect(save).toHaveBeenCalledOnceWith(12);
  });

  it('does not submit a number outside the supplied member options', () => {
    const save = spyOn(component.save, 'emit');

    component.form.patchValue({ profile: 99 });
    component.form.get('profile')?.markAsDirty();
    component.onSave();

    expect(save).not.toHaveBeenCalled();
  });

  it('does not submit while loading', () => {
    const save = spyOn(component.save, 'emit');
    component.form.patchValue({ profile: 12 });
    component.form.get('profile')?.markAsDirty();
    fixture.componentRef.setInput('loading', true);
    fixture.detectChanges();

    component.onSave();

    expect(save).not.toHaveBeenCalled();
  });

  it('forwards typed searches through the shared member search and clears the previous selection', () => {
    const search = spyOn(component.searchMember, 'emit');
    const memberSearch = fixture.debugElement.query(By.directive(MemberSearch)).componentInstance as MemberSearch;
    component.onSelectMember(component.members()[0]);

    memberSearch.onMemberChange('Luis');
    memberSearch.searchMember.emit({ query: 'Luis' });

    expect(search).toHaveBeenCalledOnceWith({ query: 'Luis' });
    expect(component.form.controls.profile.value).toBeNull();
    expect(component.saveEnabled).toBeFalse();
  });

  it('clears the selected profile when the search input is cleared', () => {
    const memberSearch = fixture.debugElement.query(By.directive(MemberSearch)).componentInstance as MemberSearch;
    component.onSelectMember(component.members()[0]);

    memberSearch.clearMember.emit();

    expect(component.form.controls.profile.value).toBeNull();
    expect(component.saveEnabled).toBeFalse();
  });

});
