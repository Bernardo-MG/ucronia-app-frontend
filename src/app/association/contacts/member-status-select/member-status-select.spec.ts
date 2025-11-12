import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MemberStatusSelect } from './member-status-select';

describe('MemberStatusSelect', () => {
  let component: MemberStatusSelect;
  let fixture: ComponentFixture<MemberStatusSelect>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MemberStatusSelect]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MemberStatusSelect);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
