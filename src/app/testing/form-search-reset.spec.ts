import { Component, Input } from '@angular/core';
import { fakeAsync, flushMicrotasks, TestBed, tick } from '@angular/core/testing';
import { FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { User } from '@bernardo-mg/authentication';
import { SearchRequest } from '@bernardo-mg/request';
import { SearchSelect, TextFilter } from '@bernardo-mg/ui';
import { Profile } from '@ucronia/domain';
import { RecurrenceUnit, ScheduledGame } from '@ucronia/domain';
import { Subject } from 'rxjs';
import { LibraryBookLendingForm } from '../association/library/library-book-lending-form/library-book-lending-form';
import { UserForm } from '../security/users/user-form/user-form';
import { ScheduledGameForm } from '../association/scheduled-game/scheduled-game-form/scheduled-game-form';
import { MemberSearch } from '../shared/member/member-search/member-search';

interface Suggestion { number: number; name: string; }

@Component({
  selector: 'app-form-search-test',
  imports: [ReactiveFormsModule, SearchSelect, TextFilter, MemberSearch],
  template: `<form [formGroup]="form">
    <input formControlName="record" />
    <ui-search-select inputId="form-author" [value]="selected" [suggestions]="results"
      (cleared)="selected = null" (queryChange)="onQuery($event)" />
    <assoc-member-search inputId="form-member" [members]="[]"
      (searchMember)="memberQueries.push($event.query)" />
    <ui-text-filter label="Buscar" [value]="text" (filter)="text = $event" />
  </form>`
})
class SearchFormHost {
  public readonly form = new FormGroup({ record: new FormControl('first') });
  public readonly responses = new Subject<Suggestion[]>();
  private readonly request = new SearchRequest();
  public results: Suggestion[] = [];
  public selected: Suggestion | null = null;
  public queries: string[] = [];
  public memberQueries: string[] = [];
  public text = '';

  @Input() public set record(value: string) {
    this.form.reset({ record: value });
  }

  public onQuery(query: string): void {
    this.queries.push(query);
    this.request.search(query, () => this.responses).subscribe(results => this.results = results);
  }
}

@Component({
  imports: [SearchFormHost],
  template: '<app-form-search-test [record]="record" />'
})
class ReusedFormHost {
  public record = 'first';
}

@Component({
  imports: [FormsModule, SearchSelect],
  template: '<form><ui-search-select inputId="template-search" (queryChange)="queries.push($event)" /></form>'
})
class TemplateFormHost {
  public queries: string[] = [];
}

@Component({
  imports: [UserForm],
  template: `<access-user-form formId="user-search" [create]="false" [selection]="[]"
    [member]="profile" [members]="members" [data]="user" (searchMember)="onQuery($event.query)" />`
})
class ReusedUserHost {
  public user = Object.assign(new User(), { username: 'alice', name: 'Alice', email: 'alice@example.com' });
  public profile = new Profile();
  public members: Profile[] = [];
  public queries: string[] = [];

  public onQuery(value: string): void {
    this.queries.push(value);
    this.members = [];
  }
}

describe('Generic form search reset', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [SearchFormHost, ReusedFormHost, TemplateFormHost, ReusedUserHost, LibraryBookLendingForm],
    providers: [provideNoopAnimations()]
  }));

  function type(input: HTMLInputElement, value: string): void {
    input.value = value;
    input.dispatchEvent(new Event('input', { bubbles: true }));
  }

  it('clears all search types and cancels their delayed queries on form reset', fakeAsync(() => {
    const fixture = TestBed.createComponent(SearchFormHost);
    fixture.detectChanges();
    tick();
    type(fixture.nativeElement.querySelector('#form-author'), 'old author');
    fixture.detectChanges();
    type(fixture.nativeElement.querySelector('#form-member'), 'old member');
    fixture.detectChanges();
    type(fixture.nativeElement.querySelector('input[type=search]'), 'old filter');
    fixture.detectChanges();
    fixture.detectChanges();
    tick(100);
    fixture.componentInstance.form.reset({ record: 'second' });
    flushMicrotasks();
    fixture.detectChanges();
    tick(400);
    expect(fixture.componentInstance.queries).not.toContain('old author');
    expect(fixture.componentInstance.memberQueries).not.toContain('old member');
    expect(fixture.componentInstance.text).toBe('');
    expect(fixture.nativeElement.querySelector('#form-author').value).toBe('');
    expect(fixture.nativeElement.querySelector('#form-member').value).toBe('');
    expect(fixture.nativeElement.querySelector('input[type=search]').value).toBe('');
    expect(fixture.componentInstance.form.pristine).toBeTrue();
  }));

  it('cancels an in-flight request and ignores its late response after reset', fakeAsync(() => {
    const fixture = TestBed.createComponent(SearchFormHost);
    fixture.detectChanges();
    tick();
    type(fixture.nativeElement.querySelector('#form-author'), 'pending');
    fixture.detectChanges();
    tick(300);
    expect(fixture.componentInstance.responses.observed).toBeTrue();
    fixture.componentInstance.form.reset({ record: 'second' });
    flushMicrotasks();
    expect(fixture.componentInstance.responses.observed).toBeFalse();
    fixture.componentInstance.responses.next([{ number: 1, name: 'late' }]);
    expect(fixture.componentInstance.results).toEqual([]);
  }));

  it('clears an already applied local text filter when its form resets', fakeAsync(() => {
    const fixture = TestBed.createComponent(SearchFormHost);
    fixture.detectChanges();
    tick();
    type(fixture.nativeElement.querySelector('input[type=search]'), 'applied');
    fixture.detectChanges();
    tick(300);
    expect(fixture.componentInstance.text).toBe('applied');
    fixture.componentInstance.form.reset();
    flushMicrotasks();
    fixture.detectChanges();
    expect(fixture.componentInstance.text).toBe('');
    tick();
    expect(fixture.nativeElement.querySelector('input[type=search]').value).toBe('');
  }));

  it('does not reset searches when an ordinary form field changes', fakeAsync(() => {
    const fixture = TestBed.createComponent(SearchFormHost);
    fixture.detectChanges();
    tick();
    type(fixture.nativeElement.querySelector('#form-author'), 'keep');
    fixture.detectChanges();
    tick(100);
    fixture.componentInstance.form.controls.record.setValue('edited field');
    fixture.detectChanges();
    tick(200);
    expect(fixture.componentInstance.queries).toContain('keep');
    expect(fixture.nativeElement.querySelector('#form-author').value).toBe('keep');
  }));

  it('handles a reused form during parent input binding without change-detection errors', fakeAsync(() => {
    const fixture = TestBed.createComponent(ReusedFormHost);
    fixture.detectChanges();
    tick();
    type(fixture.nativeElement.querySelector('#form-author'), 'previous');
    fixture.detectChanges();
    tick(100);
    fixture.componentInstance.record = 'second';
    fixture.detectChanges();
    fixture.checkNoChanges();
    flushMicrotasks();
    fixture.detectChanges();
    fixture.checkNoChanges();
    tick(400);
    expect(fixture.nativeElement.querySelector('#form-author').value).toBe('');
  }));

  it('preserves a freshly supplied selection while resetting only transient search state', fakeAsync(() => {
    const fixture = TestBed.createComponent(SearchFormHost);
    fixture.detectChanges();
    tick();
    type(fixture.nativeElement.querySelector('#form-author'), 'previous');
    fixture.detectChanges();
    tick(100);
    fixture.componentInstance.selected = { number: 2, name: 'New selection' };
    fixture.componentInstance.form.reset({ record: 'second' });
    fixture.detectChanges();
    flushMicrotasks();
    fixture.detectChanges();
    tick();
    expect(fixture.nativeElement.querySelector('#form-author').value).toBe('New selection');
    expect(fixture.componentInstance.form.pristine).toBeTrue();
    tick(300);
    expect(fixture.componentInstance.queries).not.toContain('previous');
  }));

  it('also handles template-driven form resets', fakeAsync(() => {
    const fixture = TestBed.createComponent(TemplateFormHost);
    fixture.detectChanges();
    tick();
    type(fixture.nativeElement.querySelector('#template-search'), 'previous');
    fixture.detectChanges();
    tick(100);
    const form = fixture.debugElement.query(By.directive(NgForm)).injector.get(NgForm);
    form.resetForm();
    flushMicrotasks();
    fixture.detectChanges();
    tick(400);
    expect(fixture.componentInstance.queries).not.toContain('previous');
    expect(fixture.nativeElement.querySelector('#template-search').value).toBe('');
  }));

  it('discards reset notifications queued before destruction', fakeAsync(() => {
    const fixture = TestBed.createComponent(SearchFormHost);
    fixture.detectChanges();
    tick();
    const before = fixture.componentInstance.queries.length;
    fixture.componentInstance.form.reset();
    fixture.destroy();
    flushMicrotasks();
    expect(fixture.componentInstance.queries.length).toBe(before);
  }));

  it('resets a reused user form without erasing the new selected profile', fakeAsync(() => {
    const fixture = TestBed.createComponent(ReusedUserHost);
    fixture.detectChanges();
    tick();
    type(fixture.nativeElement.querySelector('#user-search-member-search'), 'previous');
    fixture.detectChanges();
    tick(100);
    const profile = new Profile();
    profile.number = 2;
    profile.name.fullName = 'Bob';
    fixture.componentInstance.profile = profile;
    fixture.componentInstance.user = Object.assign(new User(), { username: 'bob', name: 'Bob', email: 'bob@example.com' });
    fixture.detectChanges();
    fixture.checkNoChanges();
    flushMicrotasks();
    fixture.detectChanges();
    fixture.checkNoChanges();
    tick(400);
    expect(fixture.componentInstance.queries).not.toContain('previous');
    expect(fixture.nativeElement.querySelector('#user-search-member-search').value).toBe('Bob');
  }));

  it('resets lending-form searches through the standard form reset when the book changes', fakeAsync(() => {
    const fixture = TestBed.createComponent(LibraryBookLendingForm);
    fixture.componentRef.setInput('formId', 'lending-search');
    fixture.componentRef.setInput('book', 1);
    const queries: string[] = [];
    fixture.componentInstance.searchMember.subscribe(event => queries.push(event.query));
    fixture.detectChanges();
    tick();
    type(fixture.nativeElement.querySelector('#lending-search-member-search'), 'previous');
    fixture.detectChanges();
    tick(100);
    fixture.componentRef.setInput('book', 2);
    fixture.detectChanges();
    flushMicrotasks();
    fixture.detectChanges();
    tick(400);
    expect(queries).not.toContain('previous');
    expect(fixture.componentInstance.form.get('book')?.value).toBe(2);
    expect(fixture.componentInstance.form.get('borrower')?.value).toBeNull();
    expect(fixture.nativeElement.querySelector('#lending-search-member-search').value).toBe('');
  }));

  it('preserves an explicitly supplied borrower regardless of input binding order', fakeAsync(() => {
    const fixture = TestBed.createComponent(LibraryBookLendingForm);
    const borrower = new Profile();
    borrower.number = 7;
    borrower.name.fullName = 'Alice';
    fixture.componentRef.setInput('borrower', borrower);
    fixture.componentRef.setInput('book', 2);
    fixture.detectChanges();
    tick();
    expect(fixture.componentInstance.form.get('borrower')?.value).toBe(7);
    expect(fixture.nativeElement.querySelector('p-autocomplete input').value).toBe('Alice');
  }));

  it('keeps recurrence defaults valid when loading a non-recurring game', () => {
    const component = TestBed.runInInjectionContext(() => new ScheduledGameForm());
    const game = new ScheduledGame();
    game.recurrence = undefined;
    component.data = game;
    expect(component.form.get('recurrence.interval')?.value).toBe(0);
    expect(component.form.get('recurrence.unit')?.value).toBe(RecurrenceUnit.WEEKLY);
    expect(component.form.get('recurrence.unit')?.valid).toBeTrue();
  });
});
