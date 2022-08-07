import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberInfoViewComponent } from './member-info-view.component';

describe('MemberInfoViewComponent', () => {
  let component: MemberInfoViewComponent;
  let fixture: ComponentFixture<MemberInfoViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberInfoViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemberInfoViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
