import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CoreModule } from '@app/core/core.module';
import { AccountLayoutComponent } from './account-layout.component';

describe('AccountLayoutComponent', () => {
  let component: AccountLayoutComponent;
  let fixture: ComponentFixture<AccountLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CoreModule,
        RouterTestingModule,
        HttpClientTestingModule,
        AccountLayoutComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AccountLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
