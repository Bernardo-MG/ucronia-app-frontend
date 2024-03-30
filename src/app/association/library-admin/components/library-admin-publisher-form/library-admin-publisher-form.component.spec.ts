import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryAdminPublisherFormComponent } from './library-admin-publisher-form.component';

describe('LibraryAdminPublisherFormComponent', () => {
  let component: LibraryAdminPublisherFormComponent;
  let fixture: ComponentFixture<LibraryAdminPublisherFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryAdminPublisherFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LibraryAdminPublisherFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
