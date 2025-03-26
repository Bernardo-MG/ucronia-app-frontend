import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LibraryAdminGameBookLendingFormComponent } from './library-admin-game-book-lending-form.component';

describe('LibraryAdminGameBookLendingFormComponent', () => {
  let component: LibraryAdminGameBookLendingFormComponent;
  let fixture: ComponentFixture<LibraryAdminGameBookLendingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryAdminGameBookLendingFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LibraryAdminGameBookLendingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
