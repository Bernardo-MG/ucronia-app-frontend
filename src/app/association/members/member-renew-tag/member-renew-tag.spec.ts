import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MemberRenewTag } from './member-renew-tag';

describe('MemberRenewTag', () => {
  let component: MemberRenewTag;
  let fixture: ComponentFixture<MemberRenewTag>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MemberRenewTag]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MemberRenewTag);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
