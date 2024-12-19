import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PeopleFrontpageContainer } from './people-frontpage.container';

describe('PeopleFrontpageContainer', () => {
  let component: PeopleFrontpageContainer;
  let fixture: ComponentFixture<PeopleFrontpageContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        PeopleFrontpageContainer
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PeopleFrontpageContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
