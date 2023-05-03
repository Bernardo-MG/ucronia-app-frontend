import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberSelectionFormComponent } from './member-selection-input.component';

describe('MemberSelectionFormComponent', () => {
  let component: MemberSelectionFormComponent;
  let fixture: ComponentFixture<MemberSelectionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberSelectionFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemberSelectionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
