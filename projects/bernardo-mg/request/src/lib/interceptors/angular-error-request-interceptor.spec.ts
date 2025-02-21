import { HttpErrorResponse } from "@angular/common/http";
import { FailureResponse } from "../../public-api";
import { AngularErrorRequestInterceptor } from "./angular-error-request-interceptor";

describe('AngularErrorRequestInterceptor', () => {
    let interceptor: AngularErrorRequestInterceptor;

    beforeEach(() => {
        interceptor = new AngularErrorRequestInterceptor();
    });

    it('should handle client-side or network error', (done) => {
        const errorResponse = new HttpErrorResponse({
            error: new ErrorEvent('Network error'),
            status: 0
        });

        interceptor.handle(errorResponse).subscribe({
            error: (error) => {
                expect(error).toEqual(new Error('Something bad happened; please try again later.'));
                done();
            }
        });
    });

    it('should handle failure response', (done) => {
        const failureData = { field1: [{ code: 'error', field: 'field', message: 'Invalid input', value: 'abc' }] };
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
        const errorResponse = new HttpErrorResponse({
            error: { message: 'Server error' },
            status: 500
        });

        interceptor.handle(errorResponse).subscribe({
            error: (error) => {
                expect(error).toEqual(new Error('Something bad happened; please try again later.'));
                done();
            }
        });
    });
});
