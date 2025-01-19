import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AccessRoleService } from '../../services/access-role.service';
import { AccessRoleListingContainer } from './access-role-listing.container';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('AccessRoleListingContainer', () => {
  let component: AccessRoleListingContainer;
  let fixture: ComponentFixture<AccessRoleListingContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [RouterTestingModule,
        AccessRoleListingContainer],
    providers: [
        AccessRoleService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
    ]
})
      .compileComponents();

    fixture = TestBed.createComponent(AccessRoleListingContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
