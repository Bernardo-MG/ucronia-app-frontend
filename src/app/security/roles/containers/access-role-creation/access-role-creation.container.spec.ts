import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AccessRoleCreationContainer } from './access-role-creation.container';
import { AccessRoleService } from '../../services/access-role.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('AccessRoleCreationContainer', () => {
  let component: AccessRoleCreationContainer;
  let fixture: ComponentFixture<AccessRoleCreationContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [RouterTestingModule,
        AccessRoleCreationContainer],
    providers: [
        AccessRoleService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
    ]
})
      .compileComponents();

    fixture = TestBed.createComponent(AccessRoleCreationContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
