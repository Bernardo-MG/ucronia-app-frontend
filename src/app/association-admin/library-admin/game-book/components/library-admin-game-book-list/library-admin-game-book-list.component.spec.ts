import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LibraryAdminGameBookListComponent } from './library-admin-game-book-list.component';

describe('LibraryAdminGameBookListComponent', () => {
  let component: LibraryAdminGameBookListComponent;
  let fixture: ComponentFixture<LibraryAdminGameBookListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryAdminGameBookListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LibraryAdminGameBookListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
