import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ConfirmationService } from 'primeng/api';
import { SponsorList } from './sponsor-list';

describe('SponsorList', () => {
  let component: SponsorList;
  let fixture: ComponentFixture<SponsorList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SponsorList],
      providers: [
        ConfirmationService,
        provideAnimationsAsync()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SponsorList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
