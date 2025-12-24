import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ConfirmationService } from 'primeng/api';
import { GuestList } from './guest-list';

describe('GuestList', () => {
  let component: GuestList;
  let fixture: ComponentFixture<GuestList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuestList],
      providers: [
        ConfirmationService,
        provideAnimationsAsync()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuestList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
