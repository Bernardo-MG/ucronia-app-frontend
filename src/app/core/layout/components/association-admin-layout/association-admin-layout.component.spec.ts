import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AssociationAdminLayoutComponent } from './association-admin-layout.component';

describe('AssociationAdminLayoutComponent', () => {
  let component: AssociationAdminLayoutComponent;
  let fixture: ComponentFixture<AssociationAdminLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        AssociationAdminLayoutComponent
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
