import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserFeeFrontpageComponent } from './user-fee-frontpage.component';

describe('UserFeeFrontpageComponent', () => {
  let component: UserFeeFrontpageComponent;
  let fixture: ComponentFixture<UserFeeFrontpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        UserFeeFrontpageComponent
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserFeeFrontpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
