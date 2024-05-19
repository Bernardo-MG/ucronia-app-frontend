import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryAdminDonorInfoComponent } from './library-admin-donor-info.component';

describe('LibraryAdminDonorInfoComponent', () => {
  let component: LibraryAdminDonorInfoComponent;
  let fixture: ComponentFixture<LibraryAdminDonorInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryAdminDonorInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LibraryAdminDonorInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
