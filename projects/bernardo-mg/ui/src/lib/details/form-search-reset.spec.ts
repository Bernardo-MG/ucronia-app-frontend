import { Component, Input } from '@angular/core';
import { fakeAsync, flushMicrotasks, TestBed, tick } from '@angular/core/testing';
import { FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { SearchRequest } from '@bernardo-mg/request';
import { SearchSelect } from './search-select/search-select';
import { TextFilter } from './text-filter/text-filter';
import { Subject } from 'rxjs';

interface Suggestion { number: number; name: string; }

@Component({
  imports: [ReactiveFormsModule, SearchSelect, TextFilter],
  selector: 'ui-form-search-test',
  template: `<form [formGroup]="form">
    <input formControlName="record" />
    <ui-search-select inputId="form-author" [value]="selected" [suggestions]="results"
      (cleared)="selected = null" (queryChange)="onQuery($event)" />
    <ui-text-filter label="Buscar" [value]="text" (filter)="text = $event" />
  </form>`
})
class SearchFormHost {

  @Input() public set record(value: string) {
    this.form.reset({ record: value });
  }

  public readonly form = new FormGroup({ record: new FormControl('first') });
  public readonly queries: string[] = [];
  public readonly responses = new Subject<Suggestion[]>();
  public results: Suggestion[] = [];
  public selected: Suggestion | null = null;
  public text = '';

  private readonly request = new SearchRequest();

  public onQuery(query: string): void {
    this.queries.push(query);
    this.request.search(query, () => this.responses).subscribe(results => this.results = results);
  }

}

@Component({
  imports: [SearchFormHost],
  template: '<ui-form-search-test [record]="record" />'
})
class ReusedFormHost {

  public record = 'first';

}

@Component({
  imports: [FormsModule, SearchSelect],
  template: '<form><ui-search-select inputId="template-search" (queryChange)="queries.push($event)" /></form>'
})
class TemplateFormHost {

  public readonly queries: string[] = [];

}

describe('FormSearchReset', () => {
  beforeEach(() => TestBed.configureTestingModule({ imports: [SearchFormHost, ReusedFormHost, TemplateFormHost], providers: [provideNoopAnimations()] }));

  function type(input: HTMLInputElement, value: string): void {
    input.value = value;
    input.dispatchEvent(new Event('input', { bubbles: true }));
  }

  it('clears the autocomplete and text input and cancels their delayed queries on form reset', fakeAsync(() => {
    const fixture = TestBed.createComponent(SearchFormHost);
    fixture.detectChanges();
    tick();
    type(fixture.nativeElement.querySelector('#form-author'), 'old author');
    fixture.detectChanges();
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
    expect(fixture.componentInstance.text).toBe('');
    expect(fixture.nativeElement.querySelector('#form-author').value).toBe('');
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

  it('clears an already emitted search query when its form resets', fakeAsync(() => {
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
});
