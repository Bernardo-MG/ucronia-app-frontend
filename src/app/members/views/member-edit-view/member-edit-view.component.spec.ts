import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MemberEditViewComponent } from './member-edit-view.component';

describe('MemberEditViewComponent', () => {
  let component: MemberEditViewComponent;
  let fixture: ComponentFixture<MemberEditViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [
        MemberEditViewComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MemberEditViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
