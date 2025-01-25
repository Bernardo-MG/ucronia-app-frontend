import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { LibraryAdminBookCreationFormComponent } from './library-admin-book-creation-form.component';

describe('LibraryAdminBookCreationFormComponent', () => {
  let component: LibraryAdminBookCreationFormComponent;
  let fixture: ComponentFixture<LibraryAdminBookCreationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LibraryAdminBookCreationFormComponent
      ],
      providers: [
        provideRouter([])
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LibraryAdminBookCreationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
