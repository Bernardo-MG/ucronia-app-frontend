import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { IconsModule } from '@app/shared/icons/icons.module';
import { WaitingButtonComponent } from './waiting-button.component';

@Component({
  template: `
    <layout-waiting-button [name]="name" [waiting]="waiting" [disabled]="disabled">
      {{buttonText}}
    </layout-waiting-button>
  `
})
class TestHostComponent {
  name = 'Submit';
  waiting = false;
  disabled = false;
  buttonText = 'Submit';
}

describe('WaitingButtonComponent', () => {
  let hostComponent: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let buttonElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        IconsModule,
        WaitingButtonComponent
      ],
      declarations: [TestHostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    hostComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(hostComponent).toBeTruthy();
  });

  it('should render active button when waiting is false and disabled is false', () => {
    hostComponent.waiting = false;
    hostComponent.disabled = false;
    fixture.detectChanges();

    buttonElement = fixture.debugElement.query(By.css('button'));
    expect(buttonElement.nativeElement.disabled).toBeFalsy();
    expect(buttonElement.nativeElement.textContent.trim()).toEqual('Submit');
    expect(buttonElement.nativeElement.querySelector('icon-waiting')).toBeNull();
  });

  it('should render disabled button when waiting is true', () => {
    hostComponent.waiting = true;
    fixture.detectChanges();

    buttonElement = fixture.debugElement.query(By.css('button'));
    expect(buttonElement.nativeElement.disabled).toBeTruthy();
    expect(buttonElement.nativeElement.querySelector('icon-waiting')).not.toBeNull();
  });

  it('should render disabled button when disabled is true', () => {
    hostComponent.disabled = true;
    fixture.detectChanges();

    buttonElement = fixture.debugElement.query(By.css('button'));
    expect(buttonElement.nativeElement.disabled).toBeTruthy();
    expect(buttonElement.nativeElement.querySelector('icon-waiting')).toBeNull();
  });

  it('should emit action event when button is clicked', () => {
    hostComponent.waiting = false;
    hostComponent.disabled = false;
    fixture.detectChanges();

    const waitingButtonComponent = fixture.debugElement.query(By.directive(WaitingButtonComponent)).componentInstance;
    spyOn(waitingButtonComponent.action, 'emit');
    
    buttonElement = fixture.debugElement.query(By.css('button'));
    buttonElement.nativeElement.click();

    expect(waitingButtonComponent.action.emit).toHaveBeenCalled();
  });

  it('should set button aria-label attribute as provided name', () => {
    const testName = 'Test Button';
    hostComponent.name = testName;
    fixture.detectChanges();

    buttonElement = fixture.debugElement.query(By.css('button'));
    expect(buttonElement.nativeElement.getAttribute('aria-label')).toEqual(testName);
  });

  it('should render button name for the active button', () => {
    hostComponent.name = 'Submit';
    hostComponent.waiting = false;
    fixture.detectChanges();

    buttonElement = fixture.debugElement.query(By.css('button'));
    expect(buttonElement.nativeElement.textContent.trim()).toEqual('Submit');
    expect(buttonElement.nativeElement.querySelector('icon-waiting')).toBeNull();
  });

  it('should render waiting icon for the disabled button', () => {
    hostComponent.name = 'Submit';
    hostComponent.waiting = true;
    fixture.detectChanges();

    buttonElement = fixture.debugElement.query(By.css('button'));
    expect(buttonElement.nativeElement.textContent.trim()).toEqual('');
    expect(buttonElement.nativeElement.querySelector('icon-waiting')).not.toBeNull();
  });
});
