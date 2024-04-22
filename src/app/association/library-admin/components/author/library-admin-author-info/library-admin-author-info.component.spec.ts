import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryAdminAuthorInfoComponent } from './library-admin-author-info.component';

describe('LibraryAdminAuthorInfoComponent', () => {
  let component: LibraryAdminAuthorInfoComponent;
  let fixture: ComponentFixture<LibraryAdminAuthorInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryAdminAuthorInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LibraryAdminAuthorInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
