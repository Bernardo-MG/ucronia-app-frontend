import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { Page } from '@bernardo-mg/request';
import { Activity } from '@ucronia/domain';
import { ConfirmationService } from 'primeng/api';
import { of } from 'rxjs';
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

    activityServiceMock.getAll.and.returnValue(
      of(new Page<Activity>())
    );

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
