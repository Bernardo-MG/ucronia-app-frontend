import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { PublicMember } from '@ucronia/domain';
import { PublicMemberList } from './public-member-list';

describe('PublicMemberList', () => {
  let component: PublicMemberList;
  let fixture: ComponentFixture<PublicMemberList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicMemberList],
      providers: [provideNoopAnimations()]
    }).compileComponents();

    fixture = TestBed.createComponent(PublicMemberList);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('members', [Object.assign(new PublicMember(), { number: 12, memberNumber: 37 })]);
    fixture.componentRef.setInput('rows', 10);
    fixture.componentRef.setInput('page', 1);
    fixture.componentRef.setInput('totalRecords', 1);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the member number while emitting the selected profile', () => {
    const show = spyOn(component.show, 'emit');
    fixture.componentRef.setInput('canRead', true);
    fixture.detectChanges();
    const cells = fixture.nativeElement.querySelectorAll('tbody td');
    const button = fixture.nativeElement.querySelector('button[aria-label="Ver información del socio"]');

    expect(cells[1].textContent.trim()).toBe('#37');

    button.click();

    expect(show).toHaveBeenCalledOnceWith(jasmine.objectContaining({ number: 12, memberNumber: 37 }));
    expect(fixture.nativeElement.querySelector('assoc-member-info')).toBeNull();
  });

  it('shows the last paid month only for inactive members', () => {
    const lastPaidMonth = new Date('2024-04-01T00:00:00Z');
    fixture.componentRef.setInput('members', [
      { ...new PublicMember(), number: 1, active: false, lastPaidMonth },
      { ...new PublicMember(), number: 2, active: true, lastPaidMonth },
      { ...new PublicMember(), number: 3, active: false }
    ]);
    fixture.componentRef.setInput('totalRecords', 3);
    fixture.detectChanges();

    const rows = fixture.nativeElement.querySelectorAll('tbody tr');
    expect(rows[0].textContent).toContain('Mes de baja: 04/2024');
    expect(rows[1].textContent).not.toContain('Mes de baja');
    expect(rows[2].textContent).toContain('Mes de baja: —');
  });

  it('should hide the information action when the view denies reading', () => {
    expect(fixture.nativeElement.querySelector('button[aria-label="Ver información del socio"]')).toBeNull();
  });
});
