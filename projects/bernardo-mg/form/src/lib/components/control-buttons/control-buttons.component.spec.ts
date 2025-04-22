import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ModalComponent } from '@bernardo-mg/ui';
import { ControlButtonsComponent } from './control-buttons.component';

describe('ControlButtonsComponent', () => {
  let component: ControlButtonsComponent;
  let fixture: ComponentFixture<ControlButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ControlButtonsComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ControlButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Edit button behavior', () => {
    it('should emit startEditing when edit button is clicked', () => {
      component.editable = true;
      fixture.detectChanges();

      spyOn(component.startEditing, 'emit');

      const editBtn = fixture.debugElement.query(By.css('button[aria-label="Edit"]')).nativeElement;
      editBtn.click();

      expect(component.startEditing.emit).toHaveBeenCalled();
    });

    it('should not emit startEditing when edit button is clicked but it is disabled', () => {
      component.disabled = true;
      fixture.detectChanges();

      spyOn(component.startEditing, 'emit');

      const editBtn = fixture.debugElement.query(By.css('button[aria-label="Edit"]')).nativeElement;
      editBtn.click();

      expect(component.startEditing.emit).not.toHaveBeenCalled();
    });

    it('should not emit startEditing when edit button is clicked but "editable" is false', () => {
      component.editable = false;
      fixture.detectChanges();

      spyOn(component.startEditing, 'emit');

      const editBtn = fixture.debugElement.query(By.css('button[aria-label="Edit"]')).nativeElement;
      editBtn.click();

      expect(component.startEditing.emit).not.toHaveBeenCalled();
    });

    it('should disable edit button if "editable" is false', () => {
      component.editable = false;
      fixture.detectChanges();

      const editBtn = fixture.debugElement.query(By.css('button[aria-label="Edit"]')).nativeElement;
      expect(editBtn.disabled).toBeTrue();
    });

    it('should disable edit button if "disabled" is true', () => {
      component.disabled = true;
      component.editable = true;
      fixture.detectChanges();

      const editBtn = fixture.debugElement.query(By.css('button[aria-label="Edit"]')).nativeElement;
      expect(editBtn.disabled).toBeTrue();
    });
  });

  describe('Delete button behavior', () => {
    it('should emit delete when delete button is clicked', () => {
      component.deletable = true;
      fixture.detectChanges();

      spyOn(component.delete, 'emit');

      const modal = fixture.debugElement.query(By.directive(ModalComponent));
      modal.triggerEventHandler('accept', null);

      expect(component.delete.emit).toHaveBeenCalled();
    });

    it('should not emit delete when edit button is clicked but it is disabled', () => {
      component.disabled = true;
      fixture.detectChanges();

      spyOn(component.delete, 'emit');

      const modal = fixture.debugElement.query(By.directive(ModalComponent));
      modal.triggerEventHandler('accept', null);

      expect(component.delete.emit).not.toHaveBeenCalled();
    });

    it('should not emit delete when edit button is clicked but "editable" is false', () => {
      component.editable = false;
      fixture.detectChanges();

      spyOn(component.delete, 'emit');

      const modal = fixture.debugElement.query(By.directive(ModalComponent));
      modal.triggerEventHandler('accept', null);

      expect(component.delete.emit).not.toHaveBeenCalled();
    });

    it('should disable delete button if "deletable" is false', () => {
      component.deletable = false;
      fixture.detectChanges();

      const deleteBtn = fixture.debugElement.query(By.css('button[aria-label="Delete"]')).nativeElement;
      expect(deleteBtn.disabled).toBeTrue();
    });

    it('should disable delete button if "disabled" is true', () => {
      component.disabled = true;
      component.deletable = true;
      fixture.detectChanges();

      const deleteBtn = fixture.debugElement.query(By.css('button[aria-label="Delete"]')).nativeElement;
      expect(deleteBtn.disabled).toBeTrue();
    });

  });

});
