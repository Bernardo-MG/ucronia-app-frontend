import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { TextFilter } from './text-filter';
import { By } from '@angular/platform-browser';

function dispatchInput(fixture: ComponentFixture<TextFilter>, value: string): void {
  const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
  input.value = value;
  input.dispatchEvent(new Event('input'));
  fixture.detectChanges();
}

describe('TextFilter', () => {
  let component: TextFilter;
  let fixture: ComponentFixture<TextFilter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextFilter]
    }).compileComponents();

    fixture = TestBed.createComponent(TextFilter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update filterValue when typing', fakeAsync(() => {
    const inputEl = fixture.debugElement.query(By.css('input')).nativeElement;

    inputEl.value = 'abc';
    inputEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(inputEl.value).toBe('abc');
    tick(300);
  }));

  it('should not emit before debounceTime', fakeAsync(() => {
    const spy = jasmine.createSpy('filterSpy');
    component.filter.subscribe(spy);

    const inputEl = fixture.debugElement.query(By.css('input')).nativeElement;

    inputEl.value = 'hello';
    inputEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    tick(290);

    expect(spy).not.toHaveBeenCalled();
    tick(10);
  }));

  it('should emit filter value after debounceTime', fakeAsync(() => {
    const spy = jasmine.createSpy('filterSpy');
    component.filter.subscribe(spy);

    const inputEl = fixture.debugElement.query(By.css('input')).nativeElement;

    inputEl.value = 'test';
    inputEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    tick(300);

    expect(spy).toHaveBeenCalledWith('test');
  }));

  it('should emit filter value once', fakeAsync(() => {
    const spy = jasmine.createSpy('filterSpy');
    component.filter.subscribe(spy);

    const inputEl = fixture.debugElement.query(By.css('input')).nativeElement;

    inputEl.value = 'test';
    inputEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    tick(300);

    expect(spy).toHaveBeenCalledTimes(1);
  }));

  it('should emit latest value if multiple inputs happen quickly', fakeAsync(() => {
    const spy = jasmine.createSpy('filterSpy');
    component.filter.subscribe(spy);

    const inputEl = fixture.debugElement.query(By.css('input')).nativeElement;

    inputEl.value = 'a';
    inputEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    tick(150);

    inputEl.value = 'ab';
    inputEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    tick(150);

    inputEl.value = 'abc';
    inputEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    tick(300);

    expect(spy).toHaveBeenCalledWith('abc');
  }));

  it('should emit value once if multiple inputs happen quickly', fakeAsync(() => {
    const spy = jasmine.createSpy('filterSpy');
    component.filter.subscribe(spy);

    const inputEl = fixture.debugElement.query(By.css('input')).nativeElement;

    inputEl.value = 'a';
    inputEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    tick(150);

    inputEl.value = 'ab';
    inputEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    tick(150);

    inputEl.value = 'abc';
    inputEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    tick(300);

    expect(spy).toHaveBeenCalledTimes(1);
  }));

  it('uses an implicit label without generated IDs', () => {
    const first = TestBed.createComponent(TextFilter);
    const second = TestBed.createComponent(TextFilter);
    first.componentRef.setInput('label', 'Buscar socios');
    first.detectChanges();
    second.detectChanges();
    const input = first.nativeElement.querySelector('input') as HTMLInputElement;
    expect(input.id).toBe('');
    expect(input.closest('label')?.textContent?.trim()).toBe('Buscar socios');
    expect(second.nativeElement.querySelector('input').id).toBe('');
  });

  it('accepts a parent value without emitting a search', async () => {
    await fixture.whenStable();
    const emitted = jasmine.createSpy();
    component.filter.subscribe(emitted);
    fixture.componentRef.setInput('value', 'Existing query');
    fixture.detectChanges();
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelector('input').value).toBe('Existing query');
    expect(emitted).not.toHaveBeenCalled();
  });

  it('trims and debounces the latest typed query', fakeAsync(() => {
    const emitted = jasmine.createSpy();
    fixture.componentInstance.filter.subscribe(emitted);
    dispatchInput(fixture, '  old ');
    tick(150);
    dispatchInput(fixture, '  new ');
    tick(299);
    expect(emitted).not.toHaveBeenCalled();
    tick(1);
    expect(emitted).toHaveBeenCalledOnceWith('new');
  }));

  it('clears immediately and cancels the delayed query', fakeAsync(() => {
    const emitted = jasmine.createSpy();
    fixture.componentInstance.filter.subscribe(emitted);
    dispatchInput(fixture, 'pending');
    tick(100);
    dispatchInput(fixture, '');
    expect(emitted).toHaveBeenCalledOnceWith('');
    tick(300);
    expect(emitted).toHaveBeenCalledTimes(1);
  }));

  it('deduplicates normalized queries', fakeAsync(() => {
    const emitted = jasmine.createSpy();
    fixture.componentInstance.filter.subscribe(emitted);
    dispatchInput(fixture, 'name');
    tick(300);
    dispatchInput(fixture, ' name ');
    tick(300);
    expect(emitted).toHaveBeenCalledOnceWith('name');
  }));

  it('cancels pending emissions on destruction', fakeAsync(() => {
    const emitted = jasmine.createSpy();
    fixture.componentInstance.filter.subscribe(emitted);
    dispatchInput(fixture, 'pending');
    fixture.destroy();
    tick(300);
    expect(emitted).not.toHaveBeenCalled();
  }));
});
