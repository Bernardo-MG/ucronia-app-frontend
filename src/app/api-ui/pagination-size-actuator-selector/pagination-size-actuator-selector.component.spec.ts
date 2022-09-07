import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationSizeActuatorSelectorComponent } from './pagination-size-actuator-selector.component';

describe('PaginationSizeActuatorSelectorComponent', () => {
  let component: PaginationSizeActuatorSelectorComponent;
  let fixture: ComponentFixture<PaginationSizeActuatorSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginationSizeActuatorSelectorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginationSizeActuatorSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
