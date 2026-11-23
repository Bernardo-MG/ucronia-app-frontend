import { HttpErrorResponse } from '@angular/common/http';
import { FailureResponse } from '../../public-api';
import { ErrorRequestInterceptor } from './error-request-interceptor';

describe('ErrorRequestInterceptor', () => {
  let interceptor: ErrorRequestInterceptor;

  beforeEach(() => {
    interceptor = new ErrorRequestInterceptor();
  });

  it('should handle client-side or network error', async () => {
    const errorResponse = new HttpErrorResponse({
      error: new ProgressEvent('Network error'),
      status: 0
    });

    interceptor.handle(errorResponse).subscribe({
      error: (error) => {
        expect(error).toEqual(
          new Error('A client-side or network error occurred.')
        );
        ;
      }
    });
  });

  it('should handle failure response', async () => {
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
        ;
      }
    });
  });

  it('should handle generic backend error', async () => {
    const backendError = { message: 'Server error' };

    const errorResponse = new HttpErrorResponse({
      error: backendError,
      status: 500
    });

    interceptor.handle(errorResponse).subscribe({
      error: (error) => {
        const expectedMessage = `Backend returned code 500, with body: {"message":"Server error"}`;
        expect(error).toEqual(new Error(expectedMessage));
        ;
      }
    });
  });
});