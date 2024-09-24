import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LibraryAdminDonorListComponent } from './library-admin-donor-list.component';

describe('LibraryAdminDonorListComponent', () => {
  let component: LibraryAdminDonorListComponent;
  let fixture: ComponentFixture<LibraryAdminDonorListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        LibraryAdminDonorListComponent
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LibraryAdminDonorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
