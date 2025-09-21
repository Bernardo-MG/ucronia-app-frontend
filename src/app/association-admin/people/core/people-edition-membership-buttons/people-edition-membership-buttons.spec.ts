import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PeopleEditionMembershipButtons } from './people-edition-membership-buttons';

describe('PeopleEditionMembershipButtons', () => {
  let component: PeopleEditionMembershipButtons;
  let fixture: ComponentFixture<PeopleEditionMembershipButtons>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PeopleEditionMembershipButtons]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PeopleEditionMembershipButtons);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
