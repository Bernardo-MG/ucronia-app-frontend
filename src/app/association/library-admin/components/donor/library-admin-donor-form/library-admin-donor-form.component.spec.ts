import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryAdminDonorFormComponent } from './library-admin-donor-form.component';

describe('LibraryAdminDonorFormComponent', () => {
  let component: LibraryAdminDonorFormComponent;
  let fixture: ComponentFixture<LibraryAdminDonorFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryAdminDonorFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LibraryAdminDonorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
