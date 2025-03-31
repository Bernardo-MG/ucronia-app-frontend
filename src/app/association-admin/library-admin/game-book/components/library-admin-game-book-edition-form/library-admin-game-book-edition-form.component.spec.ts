import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LibraryAdminGameBookEditionFormComponent } from './library-admin-game-book-edition-form.component';

describe('LibraryAdminGameBookEditionFormComponent', () => {
  let component: LibraryAdminGameBookEditionFormComponent;
  let fixture: ComponentFixture<LibraryAdminGameBookEditionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryAdminGameBookEditionFormComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LibraryAdminGameBookEditionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
