import { Component, createEnvironmentInjector, EnvironmentInjector, runInInjectionContext } from '@angular/core';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { AuthService } from '@bernardo-mg/authentication';
import { SearchRequest } from '@bernardo-mg/request';
import { SearchSelect } from '@bernardo-mg/ui';
import { Profile } from '@ucronia/domain';
import { ConfirmationService } from 'primeng/api';
import { of, Subject, throwError } from 'rxjs';
import { BookReportService } from '../association/library/book-report-service';
import { LibraryLendingService } from '../association/library/library-lending-service';
import { LibraryService } from '../association/library/library-service';
import { LibraryView } from '../association/library/library-view/library-view';
import { MemberSearch } from '../shared/member/member-search/member-search';

@Component({
  imports: [MemberSearch],
  template: '<label for="member-picker">Socio</label><assoc-member-search inputId="member-picker" [member]="member" [members]="[]" (clearMember)="member = emptyMember" />'
})
class MemberSearchHost {
  public member = Object.assign(new Profile(), { number: 1, name: { fullName: 'Alice' } });
  public emptyMember = new Profile();
}

describe('SearchRequest', () => {
  let request: SearchRequest;
  let injector: EnvironmentInjector;
  let destroyed: boolean;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    injector = createEnvironmentInjector([], TestBed.inject(EnvironmentInjector));
    destroyed = false;
    request = runInInjectionContext(injector, () => new SearchRequest());
  });

  afterEach(() => { if (!destroyed) injector.destroy(); });

  it('cancels the previous query and clears stale suggestions immediately', () => {
    const older = new Subject<string[]>();
    const latest = new Subject<string[]>();
    let results: string[] = [];
    request.search('old', () => older).subscribe(value => results = value);
    older.next(['old']);
    request.search('new', () => latest).subscribe(value => results = value);
    expect(results).toEqual([]);
    latest.next(['new']);
    older.next(['late']);
    expect(older.observed).toBeFalse();
    expect(results).toEqual(['new']);
  });

  it('trims queries and emits one empty result without loading a blank query', () => {
    const load = jasmine.createSpy().and.returnValue(of(['result']));
    request.search(' name ', load).subscribe();
    expect(load).toHaveBeenCalledOnceWith('name');
    load.calls.reset();
    const results: unknown[] = [];
    request.search('   ', load).subscribe(value => results.push(value));
    expect(load).not.toHaveBeenCalled();
    expect(results).toEqual([[]]);
  });

  it('clears failed results and accepts a subsequent query', () => {
    const failure = jasmine.createSpy();
    let results: string[] = [];
    request.search<string>('bad', () => throwError(() => new Error('failure')), failure)
      .subscribe(value => results = value);
    expect(failure).toHaveBeenCalledTimes(1);
    expect(results).toEqual([]);
    request.search('good', () => of(['good'])).subscribe(value => results = value);
    expect(results).toEqual(['good']);
  });

  it('keeps fields independent and ends pending requests on destruction', () => {
    const other = runInInjectionContext(injector, () => new SearchRequest());
    const first = new Subject<string[]>();
    const second = new Subject<string[]>();
    request.search('first', () => first).subscribe();
    other.search('second', () => second).subscribe();
    request.cancel();
    expect(first.observed).toBeFalse();
    expect(second.observed).toBeTrue();
    injector.destroy();
    destroyed = true;
    expect(second.observed).toBeFalse();
  });
});

describe('Shared autocomplete', () => {
  beforeEach(() => TestBed.configureTestingModule({ imports: [SearchSelect, MemberSearchHost] }));

  function createSelect() {
    const fixture = TestBed.createComponent(SearchSelect);
    fixture.componentRef.setInput('inputId', 'search-select-test');
    return fixture;
  }

  it('uses the caller-provided ID on the native input', fakeAsync(() => {
    const fixture = createSelect();
    fixture.detectChanges();
    tick();
    expect(fixture.nativeElement.querySelector('input').id).toBe('search-select-test');
  }));

  it('rejects a missing required ID', () => {
    const fixture = TestBed.createComponent(SearchSelect);
    expect(() => fixture.detectChanges()).toThrowError(/NG0950|Input is required/);
  });

  it('invalidates a read before the debounced query is sent', fakeAsync(() => {
    const fixture = createSelect();
    const query = jasmine.createSpy();
    const cleared = jasmine.createSpy();
    fixture.componentInstance.queryChange.subscribe(query);
    fixture.componentInstance.cleared.subscribe(cleared);
    fixture.componentInstance.onValueChange('typing');
    expect(query).toHaveBeenCalledOnceWith('');
    expect(cleared).toHaveBeenCalledTimes(1);
    fixture.componentInstance.onSearch(' typing ');
    tick(299);
    expect(query).not.toHaveBeenCalledWith('typing');
    tick(1);
    expect(query).toHaveBeenCalledWith('typing');
  }));

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

  it('keeps selection options available for member validation', () => {
    const fixture = createSelect();
    const selected = jasmine.createSpy();
    const query = jasmine.createSpy();
    fixture.componentInstance.selected.subscribe(selected);
    fixture.componentInstance.queryChange.subscribe(query);
    const member = { number: 1 };
    fixture.componentInstance.onSelect(member);
    expect(selected).toHaveBeenCalledOnceWith(member);
    expect(query).not.toHaveBeenCalled();
  });

  it('clears additive pickers after selecting an item', () => {
    const fixture = createSelect();
    fixture.componentRef.setInput('clearOnSelect', true);
    fixture.detectChanges();
    fixture.componentInstance.onSelect({ number: 1, name: 'Author' });
    expect(fixture.componentInstance.viewValue).toBeNull();
  });
});

describe('Library request routing', () => {
  it('disables loan searches while routing pagination to the active tab', () => {
    TestBed.configureTestingModule({ providers: [
      { provide: LibraryService, useValue: {} },
      { provide: LibraryLendingService, useValue: {} },
      { provide: BookReportService, useValue: {} },
      { provide: ConfirmationService, useValue: {} },
      { provide: AuthService, useValue: { hasPermission: () => false, hasAnyPermission: () => false } }
    ] });
    const component = TestBed.runInInjectionContext(() => new LibraryView());
    const load = spyOn(component, 'loadLendings');
    component.display = component.Display.LENDINGS;
    component.onFilter('title');
    expect(load).not.toHaveBeenCalled();
    load.calls.reset();
    component.load(2);
    expect(load).toHaveBeenCalledOnceWith(2);
  });
});
