import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PeopleCreateContainer } from './people-create.container';

describe('PeopleCreateContainer', () => {
  let component: PeopleCreateContainer;
  let fixture: ComponentFixture<PeopleCreateContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        PeopleCreateContainer
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PeopleCreateContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
