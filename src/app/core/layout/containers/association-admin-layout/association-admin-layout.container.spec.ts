import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AssociationAdminLayoutContainer } from './association-admin-layout.container';

describe('AssociationAdminLayoutContainer', () => {
  let component: AssociationAdminLayoutContainer;
  let fixture: ComponentFixture<AssociationAdminLayoutContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AssociationAdminLayoutContainer
      ],
      providers: [
        provideRouter([])
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AssociationAdminLayoutContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
