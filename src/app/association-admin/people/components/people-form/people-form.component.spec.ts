import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PeopleFormComponent } from './people-form.component';

describe('PeopleFormComponent', () => {
  let component: PeopleFormComponent;
  let fixture: ComponentFixture<PeopleFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PeopleFormComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PeopleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Member flag

  it('should return false if membership is undefined in data', () => {
    component.data = { membership: undefined } as any;
    expect(component.member).toBeFalse();
  });

  it('should return true if membership exists in data', () => {
    component.data = { membership: { active: true, renew: true } } as any;
    expect(component.member).toBeTrue();
  });

  // Member checkbox

  it('should set membership.active and membership.renew to true when checkbox is checked', () => {
    // Arrange: set up the data object
    component.data = { membership: { active: false, renew: false } } as any;

    // Act: simulate a checked event
    const eventChecked = { target: { checked: true } } as unknown as Event;
    component.onChangeMemberStatus(eventChecked);

    // Assert: verify membership is updated
    expect(component.data?.membership?.active).toBeTrue();
    expect(component.data?.membership?.renew).toBeTrue();
  });

  it('should set membership.active and membership.renew to false when checkbox is unchecked', () => {
    // Arrange: set up the data object
    component.data = { membership: { active: true, renew: true } } as any;

    // Act: simulate an unchecked event
    const eventUnchecked = { target: { checked: false } } as unknown as Event;
    component.onChangeMemberStatus(eventUnchecked);

    // Assert: verify membership is updated
    expect(component.data?.membership?.active).toBeFalse();
    expect(component.data?.membership?.renew).toBeFalse();
  });

});
