import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { FrontpageService } from '../frontpage-service';
import { Frontpage } from './frontpage';

describe('Frontpage', () => {
  let component: Frontpage;
  let fixture: ComponentFixture<Frontpage>;

  const frontpageServiceMock = {
    getContactInfo: vi.fn().mockReturnValue(of({})),
    getActivities: vi.fn().mockReturnValue(of([]))
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        Frontpage
      ],
      providers: [
        { provide: FrontpageService, useValue: frontpageServiceMock }
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
