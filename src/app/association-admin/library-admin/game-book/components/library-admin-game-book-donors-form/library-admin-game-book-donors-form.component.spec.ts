import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LibraryAdminGameBookDonorsFormComponent } from './library-admin-game-book-donors-form.component';

describe('LibraryAdminGameBookDonorsFormComponent', () => {
  let component: LibraryAdminGameBookDonorsFormComponent;
  let fixture: ComponentFixture<LibraryAdminGameBookDonorsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryAdminGameBookDonorsFormComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LibraryAdminGameBookDonorsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
