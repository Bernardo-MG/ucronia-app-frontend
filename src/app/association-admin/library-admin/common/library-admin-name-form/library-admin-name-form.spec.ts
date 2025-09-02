import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LibraryAdminNameForm } from './library-admin-name-form';

describe('LibraryAdminNameForm', () => {
  let component: LibraryAdminNameForm;
  let fixture: ComponentFixture<LibraryAdminNameForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryAdminNameForm]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LibraryAdminNameForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
