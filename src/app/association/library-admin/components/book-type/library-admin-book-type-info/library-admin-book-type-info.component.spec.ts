import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryAdminBookTypeInfoComponent } from './library-admin-book-type-info.component';

describe('LibraryAdminBookTypeInfoComponent', () => {
  let component: LibraryAdminBookTypeInfoComponent;
  let fixture: ComponentFixture<LibraryAdminBookTypeInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryAdminBookTypeInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LibraryAdminBookTypeInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
