import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LibraryGameBookDetailsComponent } from './library-game-book-details.component';

describe('LibraryGameBookDetailsComponent', () => {
  let component: LibraryGameBookDetailsComponent;
  let fixture: ComponentFixture<LibraryGameBookDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryGameBookDetailsComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LibraryGameBookDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
