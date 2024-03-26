import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberListWidgetComponent } from './member-list-widget.component';

describe('MemberListWidgetComponent', () => {
  let component: MemberListWidgetComponent;
  let fixture: ComponentFixture<MemberListWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MemberListWidgetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MemberListWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
