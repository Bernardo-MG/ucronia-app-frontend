import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LibraryLendingService } from '../library-lending-service';
import { LibraryLendingView } from './library-lending-view';

describe('LibraryLendingView', () => {
  let component: LibraryLendingView;
  let fixture: ComponentFixture<LibraryLendingView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LibraryLendingView
      ],
      providers: [
        LibraryLendingService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LibraryLendingView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
