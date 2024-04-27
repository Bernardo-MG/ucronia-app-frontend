import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryAdminBookFormComponent } from './library-admin-book-form.component';

describe('LibraryAdminBookFormComponent', () => {
  let component: LibraryAdminBookFormComponent;
  let fixture: ComponentFixture<LibraryAdminBookFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryAdminBookFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LibraryAdminBookFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
