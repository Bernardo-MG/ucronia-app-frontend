import { ComponentFixture, fakeAsync, TestBed, tick, flushMicrotasks } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Profile } from '@ucronia/domain';
import { AutoComplete } from 'primeng/autocomplete';
import { MemberSearch } from './member-search';
import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

describe('MemberSearch', () => {
  let component: MemberSearch;
  let fixture: ComponentFixture<MemberSearch>;

  const member = new Profile();
  member.number = 1;
  member.name.fullName = 'John Doe';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MemberSearch]
    }).compileComponents();

    fixture = TestBed.createComponent<MemberSearch>(MemberSearch);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('inputId', 'member-search-test');
    fixture.componentRef.setInput('members', [member]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should pass members to autocomplete suggestions', () => {
    const autoComplete = fixture.debugElement.query(
      By.directive(AutoComplete)
    ).componentInstance as AutoComplete;

    expect(autoComplete.suggestions).toEqual([member]);
  });

  it('emits the trimmed member query after the shared debounce', fakeAsync(() => {
    const emitSpy = spyOn(component.searchMember, 'emit');
    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    input.value = ' john ';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    tick(299);
    expect(emitSpy).not.toHaveBeenCalledWith({ query: 'john' });
    tick(1);
    expect(emitSpy).toHaveBeenCalledWith({ query: 'john' });
  }));

  it('should emit selectMember when onSelect is fired', () => {
    const emitSpy = spyOn(component.selectMember, 'emit');

    const autoComplete = fixture.debugElement.query(
      By.directive(AutoComplete)
    ).componentInstance as AutoComplete;

    autoComplete.onSelect.emit({
      originalEvent: new Event('click'),
      value: member
    });

    expect(emitSpy).toHaveBeenCalledOnceWith(member);
  });
  it('emits clearMember when the user types instead of selecting a suggestion', () => {
    const emitSpy = spyOn(component.clearMember, 'emit');

    component.onMemberChange('another member');

    expect(emitSpy).toHaveBeenCalledTimes(1);
  });

  it('does not clear a selected suggestion', () => {
    const emitSpy = spyOn(component.clearMember, 'emit');

    component.onMemberChange(member);

    expect(emitSpy).not.toHaveBeenCalled();
  });

  it('emits clearMember when the autocomplete clears its value', () => {
    const emitSpy = spyOn(component.clearMember, 'emit');

    component.onMemberChange(null);

    expect(emitSpy).toHaveBeenCalledTimes(1);
  });

});

@Component({
  imports: [MemberSearch],
  template: '<label for="member-picker">Socio</label><assoc-member-search inputId="member-picker" [member]="member" [members]="[]" (clearMember)="member = emptyMember" />'
})
class MemberSearchHost {
  public member = Object.assign(new Profile(), { number: 1, name: { fullName: 'Alice' } });
  public emptyMember = new Profile();
}

describe('MemberSearch selected value', () => {
  it('keeps typed text while clearing a previously selected member ID', fakeAsync(() => {
    const fixture = TestBed.createComponent(MemberSearchHost);
    fixture.detectChanges();
    tick();
    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    expect(input.id).toBe(fixture.nativeElement.querySelector('label').htmlFor);
    input.value = 'B';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    expect(fixture.componentInstance.member).toBe(fixture.componentInstance.emptyMember);
    expect(input.value).toBe('B');
    tick(300);
  }));
});

@Component({
  imports: [ReactiveFormsModule, MemberSearch],
  template: `<form [formGroup]="form">
    <assoc-member-search inputId="form-member" [members]="[]"
      (searchMember)="queries.push($event.query)" />
  </form>`
})
class MemberSearchResetHost {
  public readonly form = new FormGroup({});
  public readonly queries: string[] = [];
}

describe('MemberSearch form reset', () => {
  it('clears the input and cancels a delayed query on form reset', fakeAsync(() => {
    TestBed.configureTestingModule({ imports: [MemberSearchResetHost], providers: [provideNoopAnimations()] });
    const fixture = TestBed.createComponent(MemberSearchResetHost);
    fixture.detectChanges();
    tick();
    const input = fixture.nativeElement.querySelector('#form-member') as HTMLInputElement;
    input.value = 'old member';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    fixture.detectChanges();
    tick(100);
    fixture.componentInstance.form.reset();
    flushMicrotasks();
    fixture.detectChanges();
    tick(400);
    expect(fixture.componentInstance.queries).not.toContain('old member');
    expect(input.value).toBe('');
  }));
});
