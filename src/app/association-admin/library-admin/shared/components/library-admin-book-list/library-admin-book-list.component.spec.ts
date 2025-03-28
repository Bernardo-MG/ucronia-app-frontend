import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LibraryAdminBookListComponent } from './library-admin-book-list.component';

describe('LibraryAdminGameBookListComponent', () => {
  let component: LibraryAdminBookListComponent;
  let fixture: ComponentFixture<LibraryAdminBookListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryAdminBookListComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LibraryAdminBookListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
