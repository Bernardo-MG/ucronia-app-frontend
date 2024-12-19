import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LibraryAdminGameSystemFormComponent } from './library-admin-game-system-form.component';

describe('LibraryAdminGameSystemFormComponent', () => {
  let component: LibraryAdminGameSystemFormComponent;
  let fixture: ComponentFixture<LibraryAdminGameSystemFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryAdminGameSystemFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LibraryAdminGameSystemFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
