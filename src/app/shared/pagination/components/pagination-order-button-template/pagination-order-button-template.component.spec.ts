import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSort, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
import { Direction } from '../../models/direction';
import { PaginationOrderButtonTemplateComponent } from './pagination-order-button-template.component';

describe('PaginationOrderButtonTemplateComponent', () => {
  let component: PaginationOrderButtonTemplateComponent;
  let fixture: ComponentFixture<PaginationOrderButtonTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FontAwesomeModule
      ],
      declarations: [
        PaginationOrderButtonTemplateComponent
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationOrderButtonTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // **************************************************************************
  // General tests
  // **************************************************************************

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // **************************************************************************
  // Change direction
  // **************************************************************************

  it('should send an event to change to ascending direction when clicking for the first time', () => {
    spyOn(component.ascending, 'emit');

    const button = fixture.debugElement.query(By.css('button'));
    button.triggerEventHandler('click');

    expect(component.ascending.emit).toHaveBeenCalledTimes(1);
  });

  it('should not send an event to change to descending direction when clicking for the first time', () => {
    spyOn(component.descending, 'emit');

    const button = fixture.debugElement.query(By.css('button'));
    button.triggerEventHandler('click');

    expect(component.descending.emit).toHaveBeenCalledTimes(0);
  });

  it('should send an event to change to descending direction when clicking for the second time', () => {
    spyOn(component.descending, 'emit');

    const button = fixture.debugElement.query(By.css('button'));
    button.triggerEventHandler('click');
    button.triggerEventHandler('click');

    expect(component.descending.emit).toHaveBeenCalledTimes(1);
  });

  it('should not send an additional event to change to ascending direction when clicking for the second time', () => {
    spyOn(component.ascending, 'emit');

    const button = fixture.debugElement.query(By.css('button'));
    button.triggerEventHandler('click');
    button.triggerEventHandler('click');

    expect(component.ascending.emit).toHaveBeenCalledTimes(1);
  });

  it('should go back to unsorted when clicking for the third time', () => {
    spyOn(component.ascending, 'emit');
    spyOn(component.descending, 'emit');

    const button = fixture.debugElement.query(By.css('button'));
    button.triggerEventHandler('click');
    button.triggerEventHandler('click');
    button.triggerEventHandler('click');

    expect(component.ascending.emit).toHaveBeenCalledTimes(1);
    expect(component.descending.emit).toHaveBeenCalledTimes(1);
  });

  it('should send an event to loop back to ascending direction when clicking for the fourth time', () => {
    spyOn(component.ascending, 'emit');

    const button = fixture.debugElement.query(By.css('button'));
    button.triggerEventHandler('click');
    button.triggerEventHandler('click');
    button.triggerEventHandler('click');
    button.triggerEventHandler('click');

    expect(component.ascending.emit).toHaveBeenCalledTimes(2);
  });

  // **************************************************************************
  // Change direction and icon
  // **************************************************************************

  it('should have the unsorted icon by default', () => {
    spyOn(component.ascending, 'emit');

    expect(component.directionIcon).toEqual(faSort);
  });

  it('should change to sort up icon when clicking once', () => {
    spyOn(component.ascending, 'emit');

    const button = fixture.debugElement.query(By.css('button'));
    button.triggerEventHandler('click');

    expect(component.directionIcon).toEqual(faSortUp);
  });

  it('should change to sort down icon when clicking twice', () => {
    spyOn(component.ascending, 'emit');

    const button = fixture.debugElement.query(By.css('button'));
    button.triggerEventHandler('click');
    button.triggerEventHandler('click');

    expect(component.directionIcon).toEqual(faSortDown);
  });

  it('should rever to unsorted icon when clicking three times', () => {
    spyOn(component.ascending, 'emit');

    const button = fixture.debugElement.query(By.css('button'));
    button.triggerEventHandler('click');
    button.triggerEventHandler('click');
    button.triggerEventHandler('click');

    expect(component.directionIcon).toEqual(faSort);
  });

  // **************************************************************************
  // Direction
  // **************************************************************************

  it('should change to unsorted icon when receiving the unsorted direction', () => {
    component.direction = Direction.Unsorted;
    fixture.detectChanges();

    expect(component.directionIcon).toEqual(faSort);
  });

  it('should change to sort up icon when receiving the ascending direction', () => {
    component.direction = Direction.Ascending;
    fixture.detectChanges();

    expect(component.directionIcon).toEqual(faSortUp);
  });

  it('should change to sort down icon when receiving the descending direction', () => {
    component.direction = Direction.Descending;
    fixture.detectChanges();

    expect(component.directionIcon).toEqual(faSortDown);
  });

  // **************************************************************************
  // Disabled
  // **************************************************************************

  it('should disable the button when the component is disabled', () => {
    component.disabled = true;
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button');
    expect(button.disabled).toEqual(true);
  });

  it('should enable the button when the component is enabled', () => {
    component.disabled = false;
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button');
    expect(button.disabled).toEqual(false);
  });

});
