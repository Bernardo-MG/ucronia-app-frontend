import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImageList } from './image-list';

describe('ImageList', () => {
  let component: ImageList;
  let fixture: ComponentFixture<ImageList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [ImageList] }).compileComponents();
    fixture = TestBed.createComponent(ImageList);
    fixture.componentRef.setInput('contentUrl', (number: number) => `/images/${number}/content`);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());

  it('should format file sizes', () => {
    expect(component.formatSize(1536)).toBe('1.5 KB');
    expect(component.formatSize(2 * 1024 * 1024)).toBe('2.0 MB');
  });
});
