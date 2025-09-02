import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryAdminNameFormComponent } from './library-admin-name-form';

describe('LibraryAdminAuthorFormComponent', () => {
  let component: LibraryAdminNameFormComponent;
  let fixture: ComponentFixture<LibraryAdminNameFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryAdminNameFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LibraryAdminNameFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
