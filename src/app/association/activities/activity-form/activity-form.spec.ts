import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Image } from '@ucronia/domain';
import { of } from 'rxjs';
import { ImageService } from '../../images/image-service';
import { ActivityForm } from './activity-form';

describe('ActivityForm', () => {
  let component: ActivityForm;
  let fixture: ComponentFixture<ActivityForm>;
  const image = Object.assign(new Image(), { number: 4, name: 'Image' });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivityForm],
      providers: [{
        provide: ImageService,
        useValue: {
          getAllForSelection: jasmine.createSpy().and.returnValue(of([image])),
          content: jasmine.createSpy().and.returnValue(of(new Blob()))
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

  it('should expose the image number for authenticated selector thumbnails', () => {
    expect(component.imageOptions[0].number).toBe(image.number);
  });
});
