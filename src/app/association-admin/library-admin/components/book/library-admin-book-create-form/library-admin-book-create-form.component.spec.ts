import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryAdminBookCreateFormComponent } from './library-admin-book-create-form.component';

describe('LibraryAdminBookCreateFormComponent', () => {
  let component: LibraryAdminBookCreateFormComponent;
  let fixture: ComponentFixture<LibraryAdminBookCreateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryAdminBookCreateFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LibraryAdminBookCreateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
