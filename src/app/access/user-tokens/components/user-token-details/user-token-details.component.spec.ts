import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IconsModule } from '@app/shared/icons/icons.module';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { UserTokenInfoComponent } from '../user-token-info/user-token-info.component';
import { UserTokenDetailsComponent } from './user-token-details.component';

describe('UserTokenDetailsComponent', () => {
  let component: UserTokenDetailsComponent;
  let fixture: ComponentFixture<UserTokenDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule,
        RouterTestingModule,
        LayoutModule,
        IconsModule
      ],
      declarations: [
        UserTokenDetailsComponent,
        UserTokenInfoComponent
      ]
    });
    fixture = TestBed.createComponent(UserTokenDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
