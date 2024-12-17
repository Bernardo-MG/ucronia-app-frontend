import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryAdminPublisherInfoComponent } from './library-admin-publisher-info.component';

describe('LibraryAdminPublisherInfoComponent', () => {
  let component: LibraryAdminPublisherInfoComponent;
  let fixture: ComponentFixture<LibraryAdminPublisherInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryAdminPublisherInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LibraryAdminPublisherInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
