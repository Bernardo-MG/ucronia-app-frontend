import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ApiUiModule } from '@app/api-ui/api-ui.module';
import { LayoutModule } from '@app/layout/layout.module';
import { SecurityUserService } from '../../service/security-user.service';

import { SecurityUserListViewComponent } from './security-user-list-view.component';

describe('SecurityUserListViewComponent', () => {
  let component: SecurityUserListViewComponent;
  let fixture: ComponentFixture<SecurityUserListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        LayoutModule,
        ApiUiModule
      ],
      declarations: [
        SecurityUserListViewComponent
      ],
      providers: [
        SecurityUserService
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SecurityUserListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
