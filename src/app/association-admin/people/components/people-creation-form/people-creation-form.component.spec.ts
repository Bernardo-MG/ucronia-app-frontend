import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PeopleCreationFormComponent } from './people-creation-form.component';

describe('PeopleCreateFormComponent', () => {
  let component: PeopleCreationFormComponent;
  let fixture: ComponentFixture<PeopleCreationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PeopleCreationFormComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PeopleCreationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
