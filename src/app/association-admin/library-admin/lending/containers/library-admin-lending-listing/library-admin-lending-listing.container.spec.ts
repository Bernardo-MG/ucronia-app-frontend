import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryAdminLendingListingComponent } from './library-admin-lending-listing.container';

describe('LibraryAdminLendingListingComponent', () => {
  let component: LibraryAdminLendingListingComponent;
  let fixture: ComponentFixture<LibraryAdminLendingListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryAdminLendingListingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LibraryAdminLendingListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
