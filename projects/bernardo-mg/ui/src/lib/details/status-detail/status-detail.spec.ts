import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusDetail } from './status-detail';

describe('StatusDetail', () => {
  let component: StatusDetail;
  let fixture: ComponentFixture<StatusDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatusDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatusDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
