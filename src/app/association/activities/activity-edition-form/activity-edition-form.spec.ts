import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityEditionForm } from './activity-edition-form';

describe('ActivityEditionForm', () => {
  let component: ActivityEditionForm;
  let fixture: ComponentFixture<ActivityEditionForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivityEditionForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityEditionForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
