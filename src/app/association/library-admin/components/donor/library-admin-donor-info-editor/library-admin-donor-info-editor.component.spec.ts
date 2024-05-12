import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LibraryAdminDonorInfoEditorComponent } from './library-admin-donor-info-editor.component';

describe('LibraryAdminDonorInfoEditorComponent', () => {
  let component: LibraryAdminDonorInfoEditorComponent;
  let fixture: ComponentFixture<LibraryAdminDonorInfoEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        LibraryAdminDonorInfoEditorComponent
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LibraryAdminDonorInfoEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
