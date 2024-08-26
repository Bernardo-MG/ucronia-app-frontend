import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MemberInfoDetailsComponent } from './member-info-details.component';

describe('MemberInfoDetailsComponent', () => {
  let component: MemberInfoDetailsComponent;
  let fixture: ComponentFixture<MemberInfoDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MemberInfoDetailsComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MemberInfoDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
