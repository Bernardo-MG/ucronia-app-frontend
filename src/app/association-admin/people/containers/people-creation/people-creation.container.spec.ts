import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PeopleCreationContainer } from './people-creation.container';

describe('PeopleCreationContainer', () => {
  let component: PeopleCreationContainer;
  let fixture: ComponentFixture<PeopleCreationContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        PeopleCreationContainer
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PeopleCreationContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
