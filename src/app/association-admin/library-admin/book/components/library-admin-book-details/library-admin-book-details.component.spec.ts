import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryAdminBookDetailsComponent } from './library-admin-book-details.component';

describe('LibraryAdminBookDetailsComponent', () => {
  let component: LibraryAdminBookDetailsComponent;
  let fixture: ComponentFixture<LibraryAdminBookDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryAdminBookDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LibraryAdminBookDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
