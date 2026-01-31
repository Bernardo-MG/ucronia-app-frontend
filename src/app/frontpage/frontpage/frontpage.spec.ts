import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UcroniaClient } from '@ucronia/api';
import { of } from 'rxjs';
import { Frontpage } from './frontpage';

describe('Frontpage', () => {
  let component: Frontpage;
  let fixture: ComponentFixture<Frontpage>;

  const ucroniaClienttMock = {
    setting: {
      public: {
        get: jasmine.createSpy().and.returnValue(of({}))
      }
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        Frontpage
      ],
      providers: [
        { provide: UcroniaClient, useValue: ucroniaClienttMock }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(Frontpage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
