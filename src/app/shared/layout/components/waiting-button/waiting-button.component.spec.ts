import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { IconsModule } from '@app/shared/icons/icons.module';
import { WaitingButtonComponent } from './waiting-button.component';

describe('WaitingButtonComponent', () => {
  let component: WaitingButtonComponent;
  let fixture: ComponentFixture<WaitingButtonComponent>;
  let buttonElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        IconsModule,
        WaitingButtonComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(WaitingButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render active button when waiting is false and disabled is false', () => {
    buttonElement = fixture.debugElement.query(By.css('button'));
    expect(buttonElement.nativeElement.disabled).toBeFalsy();
    expect(buttonElement.nativeElement.textContent.trim()).toEqual('');
  });

  it('should render disabled button when waiting is true', () => {
    component.waiting = true;
    fixture.detectChanges();

    buttonElement = fixture.debugElement.query(By.css('button'));
    expect(buttonElement.nativeElement.disabled).toBeTruthy();
    expect(buttonElement.nativeElement.textContent.trim()).toEqual('');
  });

  it('should render disabled button when disabled is true', () => {
    component.disabled = true;
    fixture.detectChanges();

    buttonElement = fixture.debugElement.query(By.css('button'));
    expect(buttonElement.nativeElement.disabled).toBeTruthy();
    expect(buttonElement.nativeElement.textContent.trim()).toEqual('');
  });

  it('should emit action event when button is clicked', () => {
    spyOn(component.action, 'emit');

    buttonElement = fixture.debugElement.query(By.css('button'));
    buttonElement.nativeElement.click();

    expect(component.action.emit).toHaveBeenCalled();
  });

  it('should set button text and aria-label attribute as provided name', () => {
    const testName = 'Test Button';

    component.name = testName;
    fixture.detectChanges();

    buttonElement = fixture.debugElement.query(By.css('button'));
    expect(buttonElement.nativeElement.textContent.trim()).toEqual(testName);
    expect(buttonElement.nativeElement.getAttribute('aria-label')).toEqual(testName);
  });

  it('should render button name for the active button', () => {
    component.name = 'Submit';
    fixture.detectChanges();

    buttonElement = fixture.debugElement.query(By.css('button'));
    expect(buttonElement.nativeElement.textContent.trim()).toEqual('Submit');
    expect(buttonElement.nativeElement.querySelector('icon-waiting')).toBeNull();
  });

  it('should render button name for the disabled button', () => {
    component.name = 'Submit';
    component.waiting = true;
    fixture.detectChanges();

    buttonElement = fixture.debugElement.query(By.css('button'));
    expect(buttonElement.nativeElement.textContent.trim()).toEqual('');
    expect(buttonElement.nativeElement.querySelector('icon-waiting')).not.toBeNull();
  });

});
