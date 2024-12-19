import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LibraryAdminBookEditionFormComponent } from './library-admin-book-edition-form.component';

describe('LibraryAdminBookEditionFormComponent', () => {
  let component: LibraryAdminBookEditionFormComponent;
  let fixture: ComponentFixture<LibraryAdminBookEditionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryAdminBookEditionFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LibraryAdminBookEditionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
