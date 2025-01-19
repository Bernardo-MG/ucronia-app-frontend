import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AccessRoleService } from '../../services/access-role.service';
import { AccessRoleInfoEditionContainer } from './access-role-edition.container';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('AccessRoleInfoEditionContainer', () => {
  let component: AccessRoleInfoEditionContainer;
  let fixture: ComponentFixture<AccessRoleInfoEditionContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [RouterTestingModule,
        AccessRoleInfoEditionContainer],
    providers: [
        AccessRoleService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
    ]
})
      .compileComponents();

    fixture = TestBed.createComponent(AccessRoleInfoEditionContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
