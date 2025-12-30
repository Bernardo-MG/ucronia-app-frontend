import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MemberStatusSelectComponent } from './member-status-select.component';

describe('MemberStatusSelectComponent', () => {
  let component: MemberStatusSelectComponent;
  let fixture: ComponentFixture<MemberStatusSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MemberStatusSelectComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MemberStatusSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
