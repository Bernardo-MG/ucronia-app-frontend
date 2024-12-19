import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PeopleInfoEditionContainer } from './people-edition.container';

describe('PeopleInfoEditionContainer', () => {
  let component: PeopleInfoEditionContainer;
  let fixture: ComponentFixture<PeopleInfoEditionContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        PeopleInfoEditionContainer
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PeopleInfoEditionContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
