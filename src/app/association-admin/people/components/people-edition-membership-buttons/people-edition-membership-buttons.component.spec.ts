import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PeopleEditionMembershipButtonsComponent } from './people-edition-membership-buttons.component';

describe('PeopleEditionMembershipButtonsComponent', () => {
  let component: PeopleEditionMembershipButtonsComponent;
  let fixture: ComponentFixture<PeopleEditionMembershipButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PeopleEditionMembershipButtonsComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PeopleEditionMembershipButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
