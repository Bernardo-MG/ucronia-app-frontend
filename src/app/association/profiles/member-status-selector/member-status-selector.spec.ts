import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberStatusSelector } from './member-status-selector';

describe('MemberStatusSelector', () => {
  let component: MemberStatusSelector;
  let fixture: ComponentFixture<MemberStatusSelector>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MemberStatusSelector]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemberStatusSelector);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
