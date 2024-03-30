import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryAdminAuthorSelectionComponent } from './library-admin-author-selection.component';

describe('LibraryAdminAuthorSelectionComponent', () => {
  let component: LibraryAdminAuthorSelectionComponent;
  let fixture: ComponentFixture<LibraryAdminAuthorSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryAdminAuthorSelectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LibraryAdminAuthorSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
