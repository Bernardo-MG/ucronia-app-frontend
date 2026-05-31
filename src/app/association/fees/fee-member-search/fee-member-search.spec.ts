import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeeMemberSearch } from './fee-member-search';

describe('FeeMemberSearch', () => {
  let component: FeeMemberSearch;
  let fixture: ComponentFixture<FeeMemberSearch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeeMemberSearch]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeeMemberSearch);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
