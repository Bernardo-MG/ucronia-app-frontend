import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceInfoComponent } from './balance-info.component';
import { LayoutModule } from '@app/shared/layout/layout.module';

describe('BalanceInfoComponent', () => {
  let component: BalanceInfoComponent;
  let fixture: ComponentFixture<BalanceInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        LayoutModule
      ],
      declarations: [
        BalanceInfoComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(BalanceInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
