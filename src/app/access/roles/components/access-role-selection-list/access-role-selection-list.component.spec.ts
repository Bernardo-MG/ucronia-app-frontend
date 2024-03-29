import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccessRoleService } from '../../services/access-role.service';
import { AccessRoleSelectionListComponent } from './access-role-selection-list.component';

describe('AccessRoleSelectionListComponent', () => {
  let component: AccessRoleSelectionListComponent;
  let fixture: ComponentFixture<AccessRoleSelectionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        AccessRoleSelectionListComponent
      ],
      providers: [
        AccessRoleService
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AccessRoleSelectionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
