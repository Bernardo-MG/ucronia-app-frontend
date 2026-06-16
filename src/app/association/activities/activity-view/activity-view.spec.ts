import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ConfirmationService } from 'primeng/api';
import { ActivityService } from '../activity-service';
import { ActivityView } from './activity-view';

describe('ActivityView', () => {
  let component: ActivityView;
  let fixture: ComponentFixture<ActivityView>;

  const activityServiceMock = jasmine.createSpyObj<ActivityService>(
    'ActivityService',
    ['create', 'update', 'delete', 'getAll', 'getOne']
  );

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivityView],
      providers: [
        provideAnimationsAsync(),
        ConfirmationService,
        { provide: ActivityService, useValue: activityServiceMock }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ActivityView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
