import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Image } from '@ucronia/domain';
import { ImageForm } from './image-form';

describe('ImageForm', () => {
  let component: ImageForm;
  let fixture: ComponentFixture<ImageForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [ImageForm] }).compileComponents();
    fixture = TestBed.createComponent(ImageForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());

  it('should load image metadata for editing', () => {
    const image = Object.assign(new Image(), { number: 2, name: 'Poster', description: 'Event poster' });
    fixture.componentRef.setInput('data', image);
    fixture.detectChanges();
    expect(component.form.get('name')?.value).toBe('Poster');
    expect(component.form.get('description')?.value).toBe('Event poster');
  });
});
