import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CoreModule } from '@app/core/core.module';
import { SecurityUserRoleSelectionComponent } from './security-user-role-selection.component';

describe('SecurityUserRoleSelectionComponent', () => {
  let component: SecurityUserRoleSelectionComponent;
  let fixture: ComponentFixture<SecurityUserRoleSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CoreModule
      ],
      declarations: [ 
        SecurityUserRoleSelectionComponent 
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecurityUserRoleSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
