import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LibraryAdminFictionBookDetailsComponent } from './library-admin-fiction-book-details.component';

describe('LibraryAdminGameBookDetailsComponent', () => {
  let component: LibraryAdminFictionBookDetailsComponent;
  let fixture: ComponentFixture<LibraryAdminFictionBookDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryAdminFictionBookDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LibraryAdminFictionBookDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
