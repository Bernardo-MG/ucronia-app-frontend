import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicMemberInfoComponent } from './public-member-info.component';

describe('PublicMemberInfoComponent', () => {
  let component: PublicMemberInfoComponent;
  let fixture: ComponentFixture<PublicMemberInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicMemberInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PublicMemberInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
