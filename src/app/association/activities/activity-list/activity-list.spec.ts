import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmationService } from 'primeng/api';
import { ActivityList } from './activity-list';

describe('ActivityList', () => {
  let component: ActivityList;
  let fixture: ComponentFixture<ActivityList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ActivityList
      ],
      providers: [
        ConfirmationService
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ActivityList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
