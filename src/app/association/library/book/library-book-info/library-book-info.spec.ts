import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LibraryBookInfo } from './library-book-info';

describe('LibraryBookInfo', () => {
  let component: LibraryBookInfo;
  let fixture: ComponentFixture<LibraryBookInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LibraryBookInfo
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LibraryBookInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
