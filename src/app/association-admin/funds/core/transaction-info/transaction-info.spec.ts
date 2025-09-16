import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LibraryAdminBookInfo } from './transaction-info';

describe('LibraryAdminBookInfo', () => {
  let component: LibraryAdminBookInfo;
  let fixture: ComponentFixture<LibraryAdminBookInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LibraryAdminBookInfo
      ],
      providers: [
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LibraryAdminBookInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
