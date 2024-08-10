import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontpageContactUsComponent } from './frontpage-contact-us.component';

describe('FrontpageContactUsComponent', () => {
  let component: FrontpageContactUsComponent;
  let fixture: ComponentFixture<FrontpageContactUsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrontpageContactUsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FrontpageContactUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
