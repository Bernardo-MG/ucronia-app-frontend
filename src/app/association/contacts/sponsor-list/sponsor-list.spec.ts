import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SponsorList } from './sponsor-list';

describe('SponsorList', () => {
  let component: SponsorList;
  let fixture: ComponentFixture<SponsorList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SponsorList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SponsorList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
