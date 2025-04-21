import { FailureResponse, FailureStore } from '@bernardo-mg/request';
import { of, throwError } from 'rxjs';
import { CreateComponent } from './create.component'; // Adjust the path if needed

class TestComponent extends CreateComponent<string> {
  public savedData: string | null = null;

  constructor(private mockSaveFn: (data: string) => any) {
    super();
  }

  protected save(toSave: string) {
    return this.mockSaveFn(toSave);
  }

  protected override handleSaveSuccess(saved: string) {
    super.handleSaveSuccess(saved);
    this.savedData = saved;
  }
}

describe('CreateComponent', () => {
  let component: TestComponent;

  beforeEach(() => {
    // default to success
    component = new TestComponent(() => of('test-data'));
  });

  it('should call save and handle success', () => {
    component.onSave('test-data');

    expect(component.saving).toBeFalse();
    expect(component.savedData).toBe('test-data');
    expect(component.failures).toEqual(jasmine.any(FailureStore));
  });

  it('should set failures on FailureResponse error', () => {
    const failureStore = new FailureStore({
      'field': [{ message: 'Something went wrong' }]
    });

    const error = new FailureResponse({
      'field': [{ message: 'Something went wrong' }]
    });
    component = new TestComponent(() => throwError(() => error));

    component.onSave('bad-data');

    expect(component.saving).toBeFalse();
    expect(component.failures).toEqual(failureStore);
  });

  it('should clear failures on unknown error', () => {
    const error = new Error('Unknown error');
    component.failures = new FailureStore({
      'test': [{ message: 'Existing failure' }]
    });

    component = new TestComponent(() => throwError(() => error));

    component.onSave('bad-data');

    expect(component.saving).toBeFalse();
    expect(component.failures.getFailures('test').length).toBe(0);
  });

});
