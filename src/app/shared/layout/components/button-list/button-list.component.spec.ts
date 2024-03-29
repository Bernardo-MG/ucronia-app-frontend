import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonListComponent } from './button-list.component';

describe('ButtonListComponent', () => {
  let component: ButtonListComponent;
  let fixture: ComponentFixture<ButtonListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ButtonListComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render buttons for each value', () => {
    const testValues = ['Value 1', 'Value 2', 'Value 3'];

    component.values = testValues;
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    const buttons = compiled.querySelectorAll('button');

    expect(buttons.length).toEqual(testValues.length);
    buttons.forEach((button: any, index: any) => {
      expect(button.textContent.trim()).toEqual(testValues[index]);
    });
  });

  it('should emit picked value when button is clicked', () => {
    const testValue = 'Test Value';

    component.values = [testValue];
    fixture.detectChanges();
    spyOn(component.pick, 'emit');
    const button = fixture.nativeElement.querySelector('button');
    button.click();

    expect(component.pick.emit).toHaveBeenCalledWith(testValue);
  });

  it('should apply renderer to each value', () => {
    const testValues = ['Value 1', 'Value 2', 'Value 3'];

    const renderer = (value: string) => value.toUpperCase();
    component.values = testValues;
    component.renderer = renderer;
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    const buttons = compiled.querySelectorAll('button');
    expect(buttons.length).toEqual(testValues.length);

    buttons.forEach((button: any, index: any) => {
      expect(button.textContent.trim()).toEqual(testValues[index].toUpperCase());
    });
  });
});
