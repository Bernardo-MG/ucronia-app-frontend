import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AccessRoleService } from '../../../services/access-role.service';
import { AccessRoleSelectionListWidgetComponent } from './access-role-selection-list-widget.component';

describe('AccessRoleSelectionListWidgetComponent', () => {
  let component: AccessRoleSelectionListWidgetComponent;
  let fixture: ComponentFixture<AccessRoleSelectionListWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        AccessRoleSelectionListWidgetComponent
      ],
      providers: [
        AccessRoleService
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccessRoleSelectionListWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
