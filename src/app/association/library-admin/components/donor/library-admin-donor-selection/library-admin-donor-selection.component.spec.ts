import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryAdminDonorSelectionComponent } from './library-admin-donor-selection.component';

describe('LibraryAdminDonorSelectionComponent', () => {
  let component: LibraryAdminDonorSelectionComponent;
  let fixture: ComponentFixture<LibraryAdminDonorSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryAdminDonorSelectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LibraryAdminDonorSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
