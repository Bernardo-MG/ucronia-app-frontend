import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LibraryAdminBookReturnFormComponent } from './library-admin-book-return-form.component';

describe('LibraryAdminBookReturnFormComponent', () => {
  let component: LibraryAdminBookReturnFormComponent;
  let fixture: ComponentFixture<LibraryAdminBookReturnFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryAdminBookReturnFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LibraryAdminBookReturnFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
