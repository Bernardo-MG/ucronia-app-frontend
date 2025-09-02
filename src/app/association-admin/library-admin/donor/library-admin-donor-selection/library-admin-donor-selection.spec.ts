import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LibraryAdminDonorSelection } from './library-admin-donor-selection';

describe('LibraryAdminDonorSelection', () => {
  let component: LibraryAdminDonorSelection;
  let fixture: ComponentFixture<LibraryAdminDonorSelection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryAdminDonorSelection]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LibraryAdminDonorSelection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
