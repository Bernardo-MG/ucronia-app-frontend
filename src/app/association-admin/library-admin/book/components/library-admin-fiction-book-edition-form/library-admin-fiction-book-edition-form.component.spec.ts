import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LibraryAdminFictionBookEditionFormComponent } from './library-admin-fiction-book-edition-form.component';

describe('LibraryAdminGameBookEditionFormComponent', () => {
  let component: LibraryAdminFictionBookEditionFormComponent;
  let fixture: ComponentFixture<LibraryAdminFictionBookEditionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryAdminFictionBookEditionFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LibraryAdminFictionBookEditionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
