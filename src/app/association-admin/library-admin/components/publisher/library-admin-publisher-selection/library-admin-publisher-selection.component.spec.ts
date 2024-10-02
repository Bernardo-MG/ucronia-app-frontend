import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryAdminPublisherSelectionComponent } from './library-admin-publisher-selection.component';

describe('LibraryAdminPublisherSelectionComponent', () => {
  let component: LibraryAdminPublisherSelectionComponent;
  let fixture: ComponentFixture<LibraryAdminPublisherSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryAdminPublisherSelectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LibraryAdminPublisherSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
