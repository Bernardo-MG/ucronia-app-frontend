import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MemberService } from '../../services/member.service';
import { MemberInfoEditorComponent } from './member-info-editor.component';

describe('MemberInfoEditorComponent', () => {
  let component: MemberInfoEditorComponent;
  let fixture: ComponentFixture<MemberInfoEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MemberInfoEditorComponent
      ],
      providers: [
        MemberService
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MemberInfoEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
