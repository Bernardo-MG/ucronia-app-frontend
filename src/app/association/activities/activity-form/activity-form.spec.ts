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
          content: jasmine.createSpy().and.returnValue(of(new Blob())),
          contentUrl: jasmine.createSpy().and.returnValue('/images/4/content')
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

  it('should preserve the image URL used by the activity payload', () => {
    expect(component.imageOptions[0].url).toBe('/images/4/content');
  });

  it('should emit the selected image URL when saving', () => {
    const date = new Date(2026, 0, 1, 18, 0);
    let savedImage: string | undefined;
    component.save.subscribe(activity => savedImage = activity.image);
    component.form.patchValue({
      title: 'Activity',
      image: component.imageOptions[0].url,
      dates: [{ day: date, startHour: date, endHour: date }]
    });
    component.form.markAsDirty();

    component.onSave();

    expect(savedImage).toBe('/images/4/content');
  });
});
