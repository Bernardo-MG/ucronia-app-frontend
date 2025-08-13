import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LibraryAdminBookInfoEditionFormComponent } from './library-admin-book-info-edition-form';

describe('LibraryAdminBookInfoEditionFormComponent', () => {
  let component: LibraryAdminBookInfoEditionFormComponent;
  let fixture: ComponentFixture<LibraryAdminBookInfoEditionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryAdminBookInfoEditionFormComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LibraryAdminBookInfoEditionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
