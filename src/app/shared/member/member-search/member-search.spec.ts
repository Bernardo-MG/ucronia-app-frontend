import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AutoComplete } from 'primeng/autocomplete';

import { MemberSearch } from './member-search';

describe('MemberSearch', () => {
  let component: MemberSearch;
  let fixture: ComponentFixture<MemberSearch>;

  const member: any = {
    number: '1',
    name: {
      fullName: 'John Doe'
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MemberSearch]
    }).compileComponents();

    fixture = TestBed.createComponent(MemberSearch);
    component = fixture.componentInstance;

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

  it('should emit searchMember when completeMethod is fired', () => {
    const emitSpy = spyOn(component.searchMember, 'emit');

    const autoComplete = fixture.debugElement.query(
      By.directive(AutoComplete)
    ).componentInstance as AutoComplete;

    autoComplete.completeMethod.emit({
      originalEvent: new Event('input'),
      query: 'john'
    });

    expect(emitSpy).toHaveBeenCalledOnceWith({
      query: 'john'
    });
  });

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
});