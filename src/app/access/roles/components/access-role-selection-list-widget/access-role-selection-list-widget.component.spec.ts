import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessRoleSelectionListWidgetComponent } from './access-role-selection-list-widget.component';

describe('AccessRoleSelectionListWidgetComponent', () => {
  let component: AccessRoleSelectionListWidgetComponent;
  let fixture: ComponentFixture<AccessRoleSelectionListWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccessRoleSelectionListWidgetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccessRoleSelectionListWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
