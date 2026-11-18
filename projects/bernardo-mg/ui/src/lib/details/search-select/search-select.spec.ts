import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { SearchSelect } from './search-select';

describe('SearchSelect', () => {
  beforeEach(() => TestBed.configureTestingModule({ imports: [SearchSelect] }));

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
