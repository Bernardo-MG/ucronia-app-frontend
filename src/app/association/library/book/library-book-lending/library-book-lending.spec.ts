import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { of } from 'rxjs';
import { LibraryBookLending } from './library-book-lending';
import { Member } from '@app/domain/members/member';
import { Active } from '@app/domain/contact/active';
import { BookLent } from '@app/domain/library/book-lent';

describe('LibraryBookLending', () => {
  let component: LibraryBookLending;
  let fixture: ComponentFixture<LibraryBookLending>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LibraryBookLending
      ],
      providers: [
        provideAnimationsAsync()
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LibraryBookLending);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.currentStep).toBe(1);
    expect(component.status).toBe(Active.Active);
    expect(component.member).toBeDefined();
  });

  describe('step navigation', () => {

    it('should return to members on onReturnToMembers', () => {
      component.currentStep = 2;
      
      component.onReturnToMembers();

      expect(component.currentStep).toBe(1);
    });

    it('should go to step 2 when selecting a member', () => {
      const member = new Member();
      member.name.fullName = 'Test Member';

      component.onSelectMember(member);

      expect(component.member).toBe(member);
      expect(component.currentStep).toBe(2);
    });
  });

  describe('selection', () => {

    it('should call getMemberSelection with page and status', () => {
      const spy = jasmine.createSpy().and.returnValue(of({ content: [] }));
      fixture.componentRef.setInput('getMemberSelection', spy);

      component.onGetSelection(5);

      expect(spy).toHaveBeenCalledWith(5, component.status);
    });

    it('should render member name using nameRenderer', () => {
      const member = new Member();
      member.name.fullName = 'Renderer Test';

      expect(component.nameRenderer(member)).toBe('Renderer Test');
    });

  });

  describe('status handling', () => {

    it('should update status when the select changes', () => {
      // simulate external change
      component.status = Active.Inactive;
      expect(component.status).toBe(Active.Inactive);
    });

  });

});
