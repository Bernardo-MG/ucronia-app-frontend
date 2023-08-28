import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessRoleSelectionListComponent } from './access-role-selection-list.component';

describe('AccessRoleSelectionListComponent', () => {
  let component: AccessRoleSelectionListComponent;
  let fixture: ComponentFixture<AccessRoleSelectionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccessRoleSelectionListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccessRoleSelectionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
