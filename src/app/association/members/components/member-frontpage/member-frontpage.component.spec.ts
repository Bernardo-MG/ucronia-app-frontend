import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberFrontpageComponent } from './member-frontpage.component';

describe('MemberFrontpageComponent', () => {
  let component: MemberFrontpageComponent;
  let fixture: ComponentFixture<MemberFrontpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MemberFrontpageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MemberFrontpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
