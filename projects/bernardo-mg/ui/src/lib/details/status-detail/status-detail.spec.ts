import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusField } from './status-detail';

describe('StatusField', () => {
  let component: StatusField;
  let fixture: ComponentFixture<StatusField>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatusField]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatusField);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
