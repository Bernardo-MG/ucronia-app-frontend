import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryAdminBookUpdateFormComponent } from './library-admin-book-update-form.component';

describe('LibraryAdminBookUpdateFormComponent', () => {
  let component: LibraryAdminBookUpdateFormComponent;
  let fixture: ComponentFixture<LibraryAdminBookUpdateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryAdminBookUpdateFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LibraryAdminBookUpdateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
