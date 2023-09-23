import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FundsInfoComponent } from './funds-info.component';

describe('FundsInfoComponent', () => {
  let component: FundsInfoComponent;
  let fixture: ComponentFixture<FundsInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FundsInfoComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FundsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
