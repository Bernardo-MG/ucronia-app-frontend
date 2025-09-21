import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PeopleInfoDetails } from './people-info-details';

describe('PeopleInfoDetails', () => {
  let component: PeopleInfoDetails;
  let fixture: ComponentFixture<PeopleInfoDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PeopleInfoDetails]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PeopleInfoDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
