import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityCreationForm } from './activity-creation-form';

describe('ActivityCreationForm', () => {
  let component: ActivityCreationForm;
  let fixture: ComponentFixture<ActivityCreationForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivityCreationForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityCreationForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
