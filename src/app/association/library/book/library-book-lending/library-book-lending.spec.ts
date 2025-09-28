import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { LibraryBookLending } from './library-book-lending';

describe('LibraryBookLending', () => {
  let component: LibraryBookLending;
  let fixture: ComponentFixture<LibraryBookLending>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LibraryBookLending
      ],
      providers: [
        provideAnimationsAsync()
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LibraryBookLending);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
