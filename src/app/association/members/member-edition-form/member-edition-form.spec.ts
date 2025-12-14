import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MemberEditionForm } from './member-edition-form';

describe('MemberEditionForm', () => {
  let component: MemberEditionForm;
  let fixture: ComponentFixture<MemberEditionForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MemberEditionForm]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MemberEditionForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
