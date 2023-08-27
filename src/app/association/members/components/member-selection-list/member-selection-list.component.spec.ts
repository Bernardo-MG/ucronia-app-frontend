import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberSelectionListComponent } from './member-selection-list.component';

describe('MemberSelectionListComponent', () => {
  let component: MemberSelectionListComponent;
  let fixture: ComponentFixture<MemberSelectionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberSelectionListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemberSelectionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
