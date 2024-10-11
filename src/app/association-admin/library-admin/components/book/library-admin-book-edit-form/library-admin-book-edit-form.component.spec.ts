import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryAdminBookEditFormComponent } from './library-admin-book-edit-form.component';

describe('LibraryAdminBookEditFormComponent', () => {
  let component: LibraryAdminBookEditFormComponent;
  let fixture: ComponentFixture<LibraryAdminBookEditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryAdminBookEditFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LibraryAdminBookEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
