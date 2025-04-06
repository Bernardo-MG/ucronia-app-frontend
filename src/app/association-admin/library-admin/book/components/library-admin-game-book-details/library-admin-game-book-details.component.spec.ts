import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LibraryAdminGameBookDetailsComponent } from './library-admin-game-book-details.component';

describe('LibraryAdminGameBookDetailsComponent', () => {
  let component: LibraryAdminGameBookDetailsComponent;
  let fixture: ComponentFixture<LibraryAdminGameBookDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryAdminGameBookDetailsComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LibraryAdminGameBookDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
