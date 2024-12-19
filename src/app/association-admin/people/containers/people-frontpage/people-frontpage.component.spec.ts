import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PeopleFrontpageComponent } from './people-frontpage.component';

describe('PeopleFrontpageComponent', () => {
  let component: PeopleFrontpageComponent;
  let fixture: ComponentFixture<PeopleFrontpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        PeopleFrontpageComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PeopleFrontpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
