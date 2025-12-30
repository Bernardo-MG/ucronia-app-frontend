import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MemberStatusTag } from './member-status-tag';

describe('MemberStatusTag', () => {
  let component: MemberStatusTag;
  let fixture: ComponentFixture<MemberStatusTag>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MemberStatusTag]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemberStatusTag);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
