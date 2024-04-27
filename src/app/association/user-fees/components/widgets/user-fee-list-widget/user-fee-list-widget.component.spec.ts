import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserFeeListWidgetComponent } from './user-fee-list-widget.component';

describe('UserFeeListWidgetComponent', () => {
  let component: UserFeeListWidgetComponent;
  let fixture: ComponentFixture<UserFeeListWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        UserFeeListWidgetComponent
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserFeeListWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
