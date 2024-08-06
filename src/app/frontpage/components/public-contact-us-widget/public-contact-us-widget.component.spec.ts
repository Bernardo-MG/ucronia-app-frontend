import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicContactUsWidgetComponent } from './public-contact-us-widget.component';

describe('PublicContactUsWidgetComponent', () => {
  let component: PublicContactUsWidgetComponent;
  let fixture: ComponentFixture<PublicContactUsWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicContactUsWidgetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PublicContactUsWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
