import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PublicMemberRenewTag } from './public-member-renew-tag';

describe('PublicMemberRenewTag', () => {
  let component: PublicMemberRenewTag;
  let fixture: ComponentFixture<PublicMemberRenewTag>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicMemberRenewTag]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PublicMemberRenewTag);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
