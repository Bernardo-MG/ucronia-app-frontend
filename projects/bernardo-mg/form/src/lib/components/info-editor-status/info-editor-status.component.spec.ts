import { of, throwError } from 'rxjs';
import { FailureResponse, FailureStore } from '@bernardo-mg/request';
import { InfoEditorStatusComponent } from './info-editor-status.component';

class TestInfoEditorStatusComponent extends InfoEditorStatusComponent<any> {
  public deleteCalled = false;
  public saveCalledWith: any = null;
  public readCalled = false;

  constructor(data: any) {
    super(data);
  }

  public injectFailures(failureStore: FailureStore) {
    this.failures = failureStore;
  }

  protected delete(): void {
    this.deleteCalled = true;
  }

  protected read() {
    this.readCalled = true;
    return of({ name: 'readData' });
  }

  protected save(toSave: any) {
    this.saveCalledWith = toSave;
    return of({ name: 'savedData' });
  }

}

describe('InfoEditorStatusComponent', () => {
  let component: TestInfoEditorStatusComponent;

  beforeEach(() => {
    component = new TestInfoEditorStatusComponent({ name: 'initial' });
  });

  it('should initialize with correct data', () => {
    expect(component.data).toEqual({ name: 'initial' });
  });

  it('should enable edit if editable and not reading or editing', () => {
    component['editable'] = true;
    expect(component.editEnabled).toBeTrue();
  });

  it('should disable edit if editing', () => {
    component['editable'] = true;
    component['editing'] = true;
    expect(component.editEnabled).toBeFalse();
  });

  it('should enable delete if deletable and not reading or editing', () => {
    component['deletable'] = true;
    expect(component.deleteEnabled).toBeTrue();
  });

  it('should enable form if editable and editing', () => {
    component['editable'] = true;
    component['editing'] = true;
    expect(component.formEnabled).toBeTrue();
  });

  it('should show menu if editable and not deletable', () => {
    component['editable'] = true;
    component['deletable'] = false;
    expect(component.showMenu).toBeTrue();
  });

  it('should show menu if deletable and not editable', () => {
    component['editable'] = false;
    component['deletable'] = true;
    expect(component.showMenu).toBeTrue();
  });

  it('should not show menu if not editable and not deletable', () => {
    component['editable'] = false;
    component['deletable'] = false;
    expect(component.showMenu).toBeFalse();
  });

  it('should set editing to true on start editing', () => {
    component.onStartEditing();
    expect(component['editing']).toBeTrue();
  });

  it('should call save and update state on success', () => {
    const dataToSave = { name: 'toSave' };
    component.onSave(dataToSave);

    expect(component.saveCalledWith).toEqual(dataToSave);
    expect(component['saving']).toBeFalse();
    expect(component['editing']).toBeFalse();
    expect(component.data).toEqual({ name: 'savedData' });
  });

  it('should handle error on save and keep editing true', () => {
    spyOn(component as any, 'save').and.returnValue(
      throwError(() => new Error('save failed'))
    );

    component['editing'] = true;
    component.onSave({ name: 'badData' });

    expect(component['saving']).toBeFalse();
    expect(component['editing']).toBeTrue(); // stays in editing mode on error
  });

  it('should handle FailureResponse on save error', () => {
    const failureResponse = new FailureResponse({});
    spyOn(component as any, 'save').and.returnValue(throwError(() => failureResponse));

    component.onSave({});

    expect(component['failures']).toEqual(new FailureStore());
  });

  it('should clear failures on successful save', () => {
    const failures = new FailureStore({
      'field': [{ message: 'Existing failure' }]
    });
    component.injectFailures(failures);
    expect(component['failures'].hasFailures('field')).toBeTrue();

    component.onSave({});

    expect(component['failures'].hasFailures('field')).toBeFalse();
  });

  it('should cancel editing on cancel', () => {
    component['editing'] = true;
    component.onCancel();
    expect(component['editing']).toBeFalse();
  });

  it('should call delete method on delete', () => {
    component.onDelete();
    expect(component.deleteCalled).toBeTrue();
  });

  it('should call read and update state on load', () => {
    spyOn(component as any, 'read').and.callThrough();
    spyOn(component as any, 'onLoad').and.callThrough();
    (component as any).load();

    expect(component['readCalled']).toBeTrue();
    expect(component['onLoad']).toHaveBeenCalledWith({ name: 'readData' });
  });

  it('should clear reading flag on read error', () => {
    component['read'] = () => throwError(() => new Error('read fail'));

    (component as any).load();

    expect(component['reading']).toBeFalse();
  });

  it('should return true for waiting when reading or saving', () => {
    component['reading'] = true;
    expect(component.waiting).toBeTrue();

    component['reading'] = false;
    component['saving'] = true;
    expect(component.waiting).toBeTrue();

    component['saving'] = false;
    expect(component.waiting).toBeFalse();
  });

});
