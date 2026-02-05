import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MemberSelectStepper } from './member-select-stepper';

describe('MemberSelectStepper', () => {
  let component: MemberSelectStepper;
  let fixture: ComponentFixture<MemberSelectStepper>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MemberSelectStepper
      ],
      providers: [
        provideAnimationsAsync()
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MemberSelectStepper);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
