import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleCreateFormComponent } from './people-create-form.component';

describe('PeopleCreateFormComponent', () => {
  let component: PeopleCreateFormComponent;
  let fixture: ComponentFixture<PeopleCreateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PeopleCreateFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PeopleCreateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
