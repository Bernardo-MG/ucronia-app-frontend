import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmationService, MessageService } from 'primeng/api';
import { MemberList } from './member-list';

describe('MemberList', () => {
  let component: MemberList;
  let fixture: ComponentFixture<MemberList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MemberList],
      providers: [
        MessageService,
        ConfirmationService
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemberList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
