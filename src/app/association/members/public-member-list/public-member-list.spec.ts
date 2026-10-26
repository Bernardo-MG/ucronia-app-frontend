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

  it('should hide the information action when the view denies reading', () => {
    expect(fixture.nativeElement.querySelector('button[aria-label="Ver información del socio"]')).toBeNull();
  });
});
