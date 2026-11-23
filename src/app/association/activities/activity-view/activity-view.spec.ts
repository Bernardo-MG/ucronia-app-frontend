import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { Page } from '@bernardo-mg/request';
import { Activity } from '@ucronia/domain';
import { ConfirmationService } from '@openng/optimus-ui/api';
import { of } from 'rxjs';
import { ActivityService } from '../activity-service';
import { ImageService } from '../../images/image-service';
import { ActivityView } from './activity-view';

describe('ActivityView', () => {
  let component: ActivityView;
  let fixture: ComponentFixture<ActivityView>;

  const activityServiceMock = {
    create: vi.fn(
    ).mockName("ActivityService.create"),
    update: vi.fn().mockName("ActivityService.update"), delete: vi.fn().mockName("ActivityService.delete"), getAll: vi.fn().mockName("ActivityService.getAll"), getOne: vi.fn(
  ).mockName("ActivityService.getOne")
};

  beforeEach(async () => {

    activityServiceMock.getAll.mockReturnValue(
      of(new Page<Activity>())
    );

    await TestBed.configureTestingModule({
      imports: [ActivityView],
      providers: [
        provideAnimationsAsync(),
        ConfirmationService,
        { provide: ImageService, useValue: { getAllForSelection: () => of([]) } },
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
