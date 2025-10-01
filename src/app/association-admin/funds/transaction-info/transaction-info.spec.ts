import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LibraryBookInfo } from './transaction-info';

describe('LibraryBookInfo', () => {
  let component: LibraryBookInfo;
  let fixture: ComponentFixture<LibraryBookInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LibraryBookInfo
      ],
      providers: [
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
