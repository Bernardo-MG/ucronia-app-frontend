import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryAdminAuthorFormComponent } from './library-admin-author-form.component';

describe('LibraryAdminAuthorFormComponent', () => {
  let component: LibraryAdminAuthorFormComponent;
  let fixture: ComponentFixture<LibraryAdminAuthorFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryAdminAuthorFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LibraryAdminAuthorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
