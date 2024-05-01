import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryAdminDonorInfoEditorComponent } from './library-admin-donor-info-editor.component';

describe('LibraryAdminDonorInfoEditorComponent', () => {
  let component: LibraryAdminDonorInfoEditorComponent;
  let fixture: ComponentFixture<LibraryAdminDonorInfoEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryAdminDonorInfoEditorComponent]
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
