import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSort, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
import { Direction } from '../../../../core/api/models/direction';
import { PaginationOrderButtonTemplateComponent } from './pagination-order-button-template.component';
import { SimpleChange } from '@angular/core';

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
    spyOn(component.directionChange, 'emit');

    const button = fixture.debugElement.query(By.css('button'));
    button.triggerEventHandler('click');

    expect(component.directionChange.emit).toHaveBeenCalledTimes(1);
    expect(component.directionChange.emit).toHaveBeenCalledWith(Direction.Ascending);
  });

  it('should send an event to change to descending direction when clicking for the second time', () => {
    spyOn(component.directionChange, 'emit');

    const button = fixture.debugElement.query(By.css('button'));
    button.triggerEventHandler('click');
    button.triggerEventHandler('click');

    expect(component.directionChange.emit).toHaveBeenCalledTimes(2);
    expect(component.directionChange.emit).toHaveBeenCalledWith(Direction.Descending);
  });

  it('should go back to unsorted when clicking for the third time', () => {
    spyOn(component.directionChange, 'emit');

    const button = fixture.debugElement.query(By.css('button'));
    button.triggerEventHandler('click');
    button.triggerEventHandler('click');
    button.triggerEventHandler('click');

    expect(component.directionChange.emit).toHaveBeenCalledTimes(3);
    expect(component.directionChange.emit).toHaveBeenCalledWith(Direction.Unsorted);
  });

  it('should send an event to loop back to ascending direction when clicking for the fourth time', () => {
    spyOn(component.directionChange, 'emit');

    const button = fixture.debugElement.query(By.css('button'));
    button.triggerEventHandler('click');
    button.triggerEventHandler('click');
    button.triggerEventHandler('click');
    button.triggerEventHandler('click');

    expect(component.directionChange.emit).toHaveBeenCalledTimes(4);
    expect(component.directionChange.emit).toHaveBeenCalledWith(Direction.Ascending);
  });

  // **************************************************************************
  // Change direction and icon
  // **************************************************************************

  it('should have the unsorted icon by default', () => {
    expect(component.directionIcon).toEqual(faSort);
  });

  it('should change to sort up icon when clicking once', () => {
    const button = fixture.debugElement.query(By.css('button'));
    button.triggerEventHandler('click');

    expect(component.directionIcon).toEqual(faSortUp);
  });

  it('should change to sort down icon when clicking twice', () => {
    const button = fixture.debugElement.query(By.css('button'));
    button.triggerEventHandler('click');
    button.triggerEventHandler('click');

    expect(component.directionIcon).toEqual(faSortDown);
  });

  it('should rever to unsorted icon when clicking three times', () => {
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
    component.ngOnChanges({
      direction: new SimpleChange(null, component.direction, true)
    });
    fixture.detectChanges();

    expect(component.directionIcon).toEqual(faSort);
  });

  it('should change to sort up icon when receiving the ascending direction', () => {
    component.direction = Direction.Ascending;
    component.ngOnChanges({
      direction: new SimpleChange(null, component.direction, true)
    });
    fixture.detectChanges();

    expect(component.directionIcon).toEqual(faSortUp);
  });

  it('should change to sort down icon when receiving the descending direction', () => {
    component.direction = Direction.Descending;
    component.ngOnChanges({
      direction: new SimpleChange(null, component.direction, true)
    });
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
