import { HttpErrorResponse } from '@angular/common/http';
import { FailureResponse } from '../../public-api';
import { ErrorRequestInterceptor } from './error-request-interceptor';

describe('ErrorRequestInterceptor', () => {
  let interceptor: ErrorRequestInterceptor;

  beforeEach(() => {
    interceptor = new ErrorRequestInterceptor();
  });

  it('should handle client-side or network error', (done) => {
    const errorEvent = new ErrorEvent('Network error');
    const errorResponse = new HttpErrorResponse({
      error: errorEvent,
      status: 0
    });

    interceptor.handle(errorResponse).subscribe({
      error: (error) => {
        expect(error).toEqual(new Error(errorEvent as any));
        done();
      }
    });
  });

  it('should handle failure response', (done) => {
    const failureData = {
      field1: [
        { code: 'error', field: 'field', message: 'Invalid input', value: 'abc' }
      ]
    };

    const errorResponse = new HttpErrorResponse({
      error: { failures: failureData },
      status: 400
    });

    interceptor.handle(errorResponse).subscribe({
      error: (error) => {
        expect(error).toEqual(new FailureResponse(failureData));
        done();
      }
    });
  });

  it('should handle generic backend error', (done) => {
    const backendError = { message: 'Server error' };

    const errorResponse = new HttpErrorResponse({
      error: backendError,
      status: 500
    });

    interceptor.handle(errorResponse).subscribe({
      error: (error) => {
        const expectedMessage = `Backend returned code 500, with body: {"message":"Server error"}`;
        expect(error).toEqual(new Error(expectedMessage));
        done();
      }
    });
  });
});