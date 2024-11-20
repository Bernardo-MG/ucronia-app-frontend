import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryAdminBookSelectionComponent } from './library-admin-book-selection.component';

describe('LibraryAdminBookSelectionComponent', () => {
  let component: LibraryAdminBookSelectionComponent;
  let fixture: ComponentFixture<LibraryAdminBookSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryAdminBookSelectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LibraryAdminBookSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
