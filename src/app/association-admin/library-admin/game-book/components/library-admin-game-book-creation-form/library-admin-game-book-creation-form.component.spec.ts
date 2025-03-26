import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { LibraryAdminGameBookCreationFormComponent } from './library-admin-game-book-creation-form.component';

describe('LibraryAdminGameBookCreationFormComponent', () => {
  let component: LibraryAdminGameBookCreationFormComponent;
  let fixture: ComponentFixture<LibraryAdminGameBookCreationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LibraryAdminGameBookCreationFormComponent
      ],
      providers: [
        provideRouter([])
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LibraryAdminGameBookCreationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
