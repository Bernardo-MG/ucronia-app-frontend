import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssocLibraryAdminLendingListComponent } from './assoc-library-admin-lending-list.component';

describe('AssocLibraryAdminLendingListComponent', () => {
  let component: AssocLibraryAdminLendingListComponent;
  let fixture: ComponentFixture<AssocLibraryAdminLendingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssocLibraryAdminLendingListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssocLibraryAdminLendingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
