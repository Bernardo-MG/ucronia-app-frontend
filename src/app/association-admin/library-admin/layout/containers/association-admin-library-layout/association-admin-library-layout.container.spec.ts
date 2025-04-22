import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AssociationAdminLibraryLayoutContainer } from './association-admin-library-layout.container';

describe('AssociationAdminLibraryLayoutContainer', () => {
  let component: AssociationAdminLibraryLayoutContainer;
  let fixture: ComponentFixture<AssociationAdminLibraryLayoutContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AssociationAdminLibraryLayoutContainer
      ],
      providers: [
        provideRouter([])
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AssociationAdminLibraryLayoutContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
