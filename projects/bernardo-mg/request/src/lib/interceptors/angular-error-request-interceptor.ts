import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { FailureResponse } from "../../public-api";

/**
 * Request interceptor which returns an error response object, when the HTTP response contains an error.
 * 
 * It is prepared for the backend validation, which may send a list of failures. In that case, it returns
 * a failure response.
 */
@Injectable({
  providedIn: "root"
})
export class AngularErrorRequestInterceptor {

  public handle(error: HttpErrorResponse) {
    let response: any;

    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
      response = new Error('Something bad happened; please try again later.');
    } else if (error.error.failures) {
      // Failures response
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
      response = new FailureResponse(error.error.failures);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
      response = new Error('Something bad happened; please try again later.');
    }
    // Return an observable with a user-facing error message.
    return throwError(() => response);
  }

}