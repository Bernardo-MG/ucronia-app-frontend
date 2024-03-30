import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryAdminBookInfoComponent } from './library-admin-book-info.component';

describe('LibraryAdminBookInfoComponent', () => {
  let component: LibraryAdminBookInfoComponent;
  let fixture: ComponentFixture<LibraryAdminBookInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryAdminBookInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LibraryAdminBookInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
