import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ImageService } from '../../images/image-service';
import { ActivityForm } from './activity-form';

describe('ActivityForm', () => {
  let component: ActivityForm;
  let fixture: ComponentFixture<ActivityForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivityForm],
      providers: [{
        provide: ImageService,
        useValue: {
          getAllForSelection: jasmine.createSpy().and.returnValue(of([])),
          contentUrl: jasmine.createSpy()
        }
      }]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ActivityForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
