import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CoreModule } from '@app/core/core.module';
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
        CoreModule
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
