import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryAdminBookTypeSelectionComponent } from './library-admin-book-type-selection.component';

describe('LibraryAdminBookTypeSelectionComponent', () => {
  let component: LibraryAdminBookTypeSelectionComponent;
  let fixture: ComponentFixture<LibraryAdminBookTypeSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryAdminBookTypeSelectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LibraryAdminBookTypeSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
