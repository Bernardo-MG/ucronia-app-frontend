import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryAdminBookTypeFormComponent } from './library-admin-book-type-form.component';

describe('LibraryAdminBookTypeFormComponent', () => {
  let component: LibraryAdminBookTypeFormComponent;
  let fixture: ComponentFixture<LibraryAdminBookTypeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryAdminBookTypeFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LibraryAdminBookTypeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
