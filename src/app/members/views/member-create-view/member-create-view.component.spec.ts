import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MemberCreateViewComponent } from './member-create-view.component';

describe('MemberCreateViewComponent', () => {
  let component: MemberCreateViewComponent;
  let fixture: ComponentFixture<MemberCreateViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [
        MemberCreateViewComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MemberCreateViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
