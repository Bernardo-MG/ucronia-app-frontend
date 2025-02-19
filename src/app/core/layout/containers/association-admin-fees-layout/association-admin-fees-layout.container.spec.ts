import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AssociationAdminFeesLayoutContainer } from './association-admin-fees-layout.container';

describe('AssociationAdminFeesLayoutContainer', () => {
  let component: AssociationAdminFeesLayoutContainer;
  let fixture: ComponentFixture<AssociationAdminFeesLayoutContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AssociationAdminFeesLayoutContainer
      ],
      providers: [
        provideRouter([])
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AssociationAdminFeesLayoutContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
