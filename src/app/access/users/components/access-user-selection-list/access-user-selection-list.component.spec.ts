import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessUserSelectionListComponent } from './access-user-selection-list.component';

describe('AccessUserSelectionListComponent', () => {
  let component: AccessUserSelectionListComponent;
  let fixture: ComponentFixture<AccessUserSelectionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccessUserSelectionListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccessUserSelectionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
