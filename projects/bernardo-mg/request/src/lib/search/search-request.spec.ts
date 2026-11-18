import { createEnvironmentInjector, EnvironmentInjector, runInInjectionContext } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { SearchRequest } from './search-request';
import { of, Subject, throwError } from 'rxjs';

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
