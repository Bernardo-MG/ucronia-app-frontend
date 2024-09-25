import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LibraryAdminDonorCreateComponent } from './library-admin-donor-create.component';

describe('LibraryAdminDonorCreateComponent', () => {
  let component: LibraryAdminDonorCreateComponent;
  let fixture: ComponentFixture<LibraryAdminDonorCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        LibraryAdminDonorCreateComponent
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LibraryAdminDonorCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
