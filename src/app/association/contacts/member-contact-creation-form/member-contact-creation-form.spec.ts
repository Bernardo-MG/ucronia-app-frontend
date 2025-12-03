import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MemberContactCreationForm } from './member-contact-creation-form';

describe('MemberCreationForm', () => {
  let component: MemberContactCreationForm;
  let fixture: ComponentFixture<MemberContactCreationForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MemberContactCreationForm]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MemberContactCreationForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
