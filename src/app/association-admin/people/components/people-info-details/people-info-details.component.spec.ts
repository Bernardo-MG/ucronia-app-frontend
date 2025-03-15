import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PeopleInfoDetailsComponent } from './people-info-details.component';

describe('PeopleInfoDetailsComponent', () => {
  let component: PeopleInfoDetailsComponent;
  let fixture: ComponentFixture<PeopleInfoDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PeopleInfoDetailsComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PeopleInfoDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
