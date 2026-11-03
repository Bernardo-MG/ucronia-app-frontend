import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Profile } from '@ucronia/domain';
import { AutoComplete } from 'primeng/autocomplete';

import { MemberSearch } from './member-search';

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