import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberSelectionModalComponent } from './member-selection-modal.component';

describe('MemberSelectionModalComponent', () => {
  let component: MemberSelectionModalComponent;
  let fixture: ComponentFixture<MemberSelectionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberSelectionModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemberSelectionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
