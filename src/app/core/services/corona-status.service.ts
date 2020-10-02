import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse  } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import * as covidData from '@shared/data/owid-covid-data.json';

@Injectable({
  providedIn: 'root'
})
export class CoronaStatusService {



  apiURL = 'https://covid.ourworldindata.org/data/owid-covid-data.json';

  constructor(private httpClient: HttpClient) { }


/* set type of return to type of return result from get
https://github.com/ReactiveX/rxjs/issues/3673 */

  // getCoronaStatus(): Observable<any> {
  //   return this.httpClient.get<any>(`${this.apiURL}`).pipe(retry(3), catchError(this.handleError) );
  // }

  getCoronaStatusLocal(): Observable<any> {
    return of(covidData);
  }

  handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

}
