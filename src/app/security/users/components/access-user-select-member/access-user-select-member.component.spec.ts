import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccessUserSelectMemberComponent } from './access-user-select-member.component';

describe('AccessUserSelectMemberComponent', () => {
  let component: AccessUserSelectMemberComponent;
  let fixture: ComponentFixture<AccessUserSelectMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccessUserSelectMemberComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AccessUserSelectMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
