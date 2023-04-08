import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CoreModule } from '@app/core/core.module';
import { AccountFrameComponent } from './account-frame.component';

describe('AccountFrameComponent', () => {
  let component: AccountFrameComponent;
  let fixture: ComponentFixture<AccountFrameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CoreModule,
        RouterTestingModule
      ],
      declarations: [ 
        AccountFrameComponent
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
