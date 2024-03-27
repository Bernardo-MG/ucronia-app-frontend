import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessUserSelectionListWidgetComponent } from './access-user-selection-list-widget.component';

describe('AccessUserSelectionListWidgetComponent', () => {
  let component: AccessUserSelectionListWidgetComponent;
  let fixture: ComponentFixture<AccessUserSelectionListWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccessUserSelectionListWidgetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccessUserSelectionListWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
