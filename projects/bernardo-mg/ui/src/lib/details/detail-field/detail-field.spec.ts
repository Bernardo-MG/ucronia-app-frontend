import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DetailField } from './detail-field';
import { SkeletonModule } from 'primeng/skeleton';

describe('DetailField', () => {
  let component: DetailField;
  let fixture: ComponentFixture<DetailField>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailField, SkeletonModule]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailField);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render name', () => {
    fixture.componentRef.setInput('name', 'Username');

    fixture.detectChanges();

    const nameEl = fixture.nativeElement.querySelector('p.text-gray-500');
    expect(nameEl.textContent).toContain('Username');
  });

  it('should render icon class', () => {
    fixture.componentRef.setInput('icon', 'pi pi-user');

    fixture.detectChanges();

    const iconEl = fixture.nativeElement.querySelector('i');
    expect(iconEl.classList).toContain('pi');
    expect(iconEl.classList).toContain('pi-user');
  });

  describe('loading', () => {

    it('should show skeleton when loading', () => {
      fixture.componentRef.setInput('loading', true);

      fixture.detectChanges();

      const skeleton = fixture.debugElement.query(By.css('p-skeleton'));
      expect(skeleton).toBeTruthy();
    });

    it('should hide text when loading', () => {
      fixture.componentRef.setInput('loading', true);

      fixture.detectChanges();

      const valueEl = fixture.nativeElement.querySelector('p.font-semibold');
      expect(valueEl).toBeFalsy();
    });

    it('should render value when not loading', () => {
      fixture.componentRef.setInput('loading', false);
      fixture.componentRef.setInput('value', 'Hello world');

      fixture.detectChanges();

      const valueEl = fixture.nativeElement.querySelector('p.font-semibold');
      expect(valueEl).toBeTruthy();
      expect(valueEl.textContent).toContain('Hello world');
    });

  });

  describe('multiline', () => {

    it('should convert newline characters into <br>', () => {
      fixture.componentRef.setInput('loading', false);
      fixture.componentRef.setInput('value', 'Line 1\nLine 2\nLine 3');

      fixture.detectChanges();

      const valueEl = fixture.nativeElement.querySelector('p.font-semibold');

      expect(valueEl.innerHTML).toContain('Line 1<br>Line 2<br>Line 3');
    });

    it('should return empty string for null value', () => {
      const result = component.formatMultiline(null);
      expect(result).toBe('');
    });

    it('should return empty string for undefined value', () => {
      const result = component.formatMultiline(undefined);
      expect(result).toBe('');
    });

    it('should stringify non-string values', () => {
      const result = component.formatMultiline(12345 as any);
      expect(result).toBe('12345');
    });

  });

});