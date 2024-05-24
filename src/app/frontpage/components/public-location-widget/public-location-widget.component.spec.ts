import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicLocationWidgetComponent } from './public-location-widget.component';

describe('PublicLocationWidgetComponent', () => {
  let component: PublicLocationWidgetComponent;
  let fixture: ComponentFixture<PublicLocationWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicLocationWidgetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PublicLocationWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
