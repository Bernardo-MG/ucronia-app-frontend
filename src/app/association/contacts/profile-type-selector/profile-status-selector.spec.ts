import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileStatusSelector } from './profile-status-selector';

describe('ProfileStatusSelector', () => {
  let component: ContactStatusSelector;
  let fixture: ComponentFixture<ContactStatusSelector>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactStatusSelector]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactStatusSelector);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
