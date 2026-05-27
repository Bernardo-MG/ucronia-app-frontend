import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SummaryCard } from './summary-card';
import { By } from '@angular/platform-browser';

describe('SummaryCard', () => {
  let component: SummaryCard;
  let fixture: ComponentFixture<SummaryCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SummaryCard]
    }).compileComponents();

    fixture = TestBed.createComponent(SummaryCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the label', () => {
    fixture.componentRef.setInput('label', 'Users');
    fixture.detectChanges();

    const labelEl = fixture.debugElement.query(By.css('p.text-gray-500'));
    expect(labelEl.nativeElement.textContent).toContain('Users');
  });

  it('should render the icon class correctly', () => {
    fixture.componentRef.setInput('icon', 'pi pi-user');
    fixture.detectChanges();

    const iconEl = fixture.debugElement.query(By.css('i'));
    expect(iconEl.nativeElement.className).toContain('pi pi-user');
  });

  describe('loading', () => {

    it('should display the value when not loading', () => {
      fixture.componentRef.setInput('loading', false);
      fixture.componentRef.setInput('value', 42);
      fixture.detectChanges();

      const valueEl = fixture.debugElement.query(By.css('p.text-2xl'));
      expect(valueEl.nativeElement.textContent.trim()).toBe('42');
    });

    it('should show skeleton when loading', () => {
      fixture.componentRef.setInput('loading', true);
      fixture.detectChanges();

      const skeletonEl = fixture.debugElement.query(By.css('p-skeleton'));

      expect(skeletonEl).toBeTruthy();
    });

    it('should hide the content when loading', () => {
      fixture.componentRef.setInput('loading', true);
      fixture.detectChanges();

      const valueEl = fixture.debugElement.query(By.css('p.text-2xl'));

      expect(valueEl).toBeFalsy();
    });

  });

});