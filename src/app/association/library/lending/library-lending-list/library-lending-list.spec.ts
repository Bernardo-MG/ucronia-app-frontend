import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LibraryLendingService } from '../library-lending-service';
import { LibraryLendingList } from './library-lending-list';

describe('LibraryLendingList', () => {
  let component: LibraryLendingList;
  let fixture: ComponentFixture<LibraryLendingList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LibraryLendingList
      ],
      providers: [
        LibraryLendingService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LibraryLendingList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
