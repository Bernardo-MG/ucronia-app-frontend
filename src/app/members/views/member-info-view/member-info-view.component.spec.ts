import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MemberInfoViewComponent } from './member-info-view.component';

describe('MemberInfoViewComponent', () => {
  let component: MemberInfoViewComponent;
  let fixture: ComponentFixture<MemberInfoViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        MemberInfoViewComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MemberInfoViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
