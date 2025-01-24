import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AssociationAdminLayoutComponent } from './association-admin-layout.component';

describe('AssociationAdminLayoutComponent', () => {
  let component: AssociationAdminLayoutComponent;
  let fixture: ComponentFixture<AssociationAdminLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AssociationAdminLayoutComponent
      ],
      providers: [
        provideRouter([])
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AssociationAdminLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
