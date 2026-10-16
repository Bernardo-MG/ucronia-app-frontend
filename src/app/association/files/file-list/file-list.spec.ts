import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FileList } from './file-list';

describe('FileList', () => {
  let component: FileList;
  let fixture: ComponentFixture<FileList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [FileList] }).compileComponents();
    fixture = TestBed.createComponent(FileList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());

  it('should format file sizes', () => {
    expect(component.formatSize(1536)).toBe('1.5 KB');
    expect(component.formatSize(2 * 1024 * 1024)).toBe('2.0 MB');
  });
});
