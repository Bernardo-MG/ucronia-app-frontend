import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { TextFilter } from './text-filter';
import { By } from '@angular/platform-browser';

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

    expect(component.filterValue).toBe('abc');
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

});