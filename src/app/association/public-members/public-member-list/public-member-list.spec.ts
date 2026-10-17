import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PublicMember } from '@ucronia/domain';
import { PublicMemberList } from './public-member-list';

describe('PublicMemberList', () => {
  let component: PublicMemberList;
  let fixture: ComponentFixture<PublicMemberList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicMemberList],
      providers: [
        MessageService,
        ConfirmationService
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicMemberList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('shows the member number from the public API response', () => {
    const member = Object.assign(new PublicMember(), { memberNumber: 37 });
    fixture.componentRef.setInput('members', [member]);
    fixture.componentRef.setInput('rows', 10);
    fixture.componentRef.setInput('page', 1);
    fixture.componentRef.setInput('totalRecords', 1);
    fixture.detectChanges();

    const cells = fixture.nativeElement.querySelectorAll('tbody td');
    expect(cells[1].textContent.trim()).toBe('#37');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
