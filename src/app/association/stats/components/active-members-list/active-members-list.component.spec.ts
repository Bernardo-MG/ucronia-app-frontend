import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveMembersListComponent } from './active-members-list.component';

describe('ActiveMembersListComponent', () => {
  let component: ActiveMembersListComponent;
  let fixture: ComponentFixture<ActiveMembersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActiveMembersListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActiveMembersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
