import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccessUserSelectMember } from './access-user-select-member';

describe('AccessUserSelectMember', () => {
  let component: AccessUserSelectMember;
  let fixture: ComponentFixture<AccessUserSelectMember>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccessUserSelectMember]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AccessUserSelectMember);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
