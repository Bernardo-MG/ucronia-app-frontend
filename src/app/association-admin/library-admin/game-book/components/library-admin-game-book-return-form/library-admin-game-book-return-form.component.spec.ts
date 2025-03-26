import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LibraryAdminGameBookReturnFormComponent } from './library-admin-game-book-return-form.component';

describe('LibraryAdminGameBookReturnFormComponent', () => {
  let component: LibraryAdminGameBookReturnFormComponent;
  let fixture: ComponentFixture<LibraryAdminGameBookReturnFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryAdminGameBookReturnFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LibraryAdminGameBookReturnFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
