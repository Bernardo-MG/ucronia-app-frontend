import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { IconsModule } from '@app/shared/icons/icons.module';
import { UserTokenInfoComponent } from './user-token-info.component';

describe('UserTokenInfoComponent', () => {
  let component: UserTokenInfoComponent;
  let fixture: ComponentFixture<UserTokenInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        IconsModule,
        UserTokenInfoComponent
      ]
    });
    fixture = TestBed.createComponent(UserTokenInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
