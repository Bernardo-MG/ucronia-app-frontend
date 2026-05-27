import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { StatusDetail } from './status-detail';
import { SkeletonModule } from 'primeng/skeleton';

describe('StatusDetail', () => {
  let component: StatusDetail;
  let fixture: ComponentFixture<StatusDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatusDetail, SkeletonModule]
    }).compileComponents();

    fixture = TestBed.createComponent(StatusDetail);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should display name', () => {
    fixture.componentRef.setInput('name', 'System status');

    fixture.detectChanges();

    const name = fixture.nativeElement.querySelector('p.text-gray-500');
    expect(name.textContent).toContain('System status');
  });

  describe('true icon', () => {

    it('should render true state text', () => {
      fixture.componentRef.setInput('value', true);
      fixture.componentRef.setInput('icon', 'pi pi-check');
      fixture.componentRef.setInput('trueText', 'Enabled');
      fixture.componentRef.setInput('falseText', 'Disabled');
      fixture.componentRef.setInput('name', 'Status');

      fixture.detectChanges();

      const text = fixture.nativeElement.querySelector('span.font-semibold');

      expect(text.textContent).toContain('Enabled');
    });

    it('should render true state icon', () => {
      fixture.componentRef.setInput('value', true);
      fixture.componentRef.setInput('icon', 'pi pi-check');
      fixture.componentRef.setInput('trueText', 'Enabled');
      fixture.componentRef.setInput('falseText', 'Disabled');
      fixture.componentRef.setInput('name', 'Status');

      fixture.detectChanges();

      const icon = fixture.nativeElement.querySelector('span.pi.pi-check');

      expect(icon).toBeTruthy();
    });

  });

  describe('false icon', () => {

    it('should render false state text when provided', () => {
      fixture.componentRef.setInput('value', false);
      fixture.componentRef.setInput('icon', 'pi pi-check');
      fixture.componentRef.setInput('falseIcon', 'pi pi-times');
      fixture.componentRef.setInput('trueText', 'Enabled');
      fixture.componentRef.setInput('falseText', 'Disabled');
      fixture.componentRef.setInput('name', 'Status');

      fixture.detectChanges();

      const text = fixture.nativeElement.querySelector('span.font-semibold');

      expect(text.textContent).toContain('Disabled');
    });

    it('should render false state falseIcon when provided', () => {
      fixture.componentRef.setInput('value', false);
      fixture.componentRef.setInput('icon', 'pi pi-check');
      fixture.componentRef.setInput('falseIcon', 'pi pi-times');
      fixture.componentRef.setInput('trueText', 'Enabled');
      fixture.componentRef.setInput('falseText', 'Disabled');
      fixture.componentRef.setInput('name', 'Status');

      fixture.detectChanges();

      const icon = fixture.nativeElement.querySelector('span.pi.pi-times');

      expect(icon).toBeTruthy();
    });

    it('should fallback to default icon when falseIcon is not provided', () => {
      fixture.componentRef.setInput('value', false);
      fixture.componentRef.setInput('icon', 'pi pi-check');
      fixture.componentRef.setInput('falseIcon', undefined);
      fixture.componentRef.setInput('trueText', 'Enabled');
      fixture.componentRef.setInput('falseText', 'Disabled');

      fixture.detectChanges();

      const icon = fixture.nativeElement.querySelector('span.pi.pi-check');
      expect(icon).toBeTruthy();
    });

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

      const value = fixture.nativeElement.querySelector('span.font-semibold');
      expect(value).toBeFalsy();
    });

    it('should hide skeleton when not loading', () => {
      fixture.componentRef.setInput('loading', false);
      fixture.componentRef.setInput('trueText', 'Enabled');
      fixture.componentRef.setInput('falseText', 'Disabled');

      fixture.detectChanges();

      const skeleton = fixture.debugElement.query(By.css('p-skeleton'));
      expect(skeleton).toBeFalsy();
    });

  });

});