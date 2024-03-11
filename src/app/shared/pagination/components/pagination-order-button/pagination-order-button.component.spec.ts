import { SimpleChange } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSort, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
import { Direction } from '../../../../core/api/models/direction';
import { PaginationOrderButtonComponent } from './pagination-order-button.component';
import { SortField } from '@app/core/api/models/sort-field';

describe('PaginationOrderButtonComponent', () => {
  let component: PaginationOrderButtonComponent;
  let fixture: ComponentFixture<PaginationOrderButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FontAwesomeModule
      ],
      declarations: [
        PaginationOrderButtonComponent
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationOrderButtonComponent);
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
    component.property = 'property';

    spyOn(component.directionChange, 'emit');

    const button = fixture.debugElement.query(By.css('button'));
    button.triggerEventHandler('click');

    expect(component.directionChange.emit).toHaveBeenCalledTimes(1);
    const sort = new SortField('property');
    sort.direction = Direction.Ascending;
    expect(component.directionChange.emit).toHaveBeenCalledWith(sort);
  });

  it('should send an event to change to descending direction when clicking for the second time', () => {
    component.property = 'property';

    spyOn(component.directionChange, 'emit');

    const button = fixture.debugElement.query(By.css('button'));
    button.triggerEventHandler('click');
    button.triggerEventHandler('click');

    expect(component.directionChange.emit).toHaveBeenCalledTimes(2);
    const sort = new SortField('property');
    sort.direction = Direction.Descending;
    expect(component.directionChange.emit).toHaveBeenCalledWith(sort);
  });

  it('should go back to unsorted when clicking for the third time', () => {
    component.property = 'property';

    spyOn(component.directionChange, 'emit');

    const button = fixture.debugElement.query(By.css('button'));
    button.triggerEventHandler('click');
    button.triggerEventHandler('click');
    button.triggerEventHandler('click');

    expect(component.directionChange.emit).toHaveBeenCalledTimes(3);
    const sort = new SortField('property');
    sort.direction = Direction.Unsorted;
    expect(component.directionChange.emit).toHaveBeenCalledWith(sort);
  });

  it('should send an event to loop back to ascending direction when clicking for the fourth time', () => {
    component.property = 'property';

    spyOn(component.directionChange, 'emit');

    const button = fixture.debugElement.query(By.css('button'));
    button.triggerEventHandler('click');
    button.triggerEventHandler('click');
    button.triggerEventHandler('click');
    button.triggerEventHandler('click');

    expect(component.directionChange.emit).toHaveBeenCalledTimes(4);
    const sort = new SortField('property');
    sort.direction = Direction.Ascending;
    expect(component.directionChange.emit).toHaveBeenCalledWith(sort);
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
