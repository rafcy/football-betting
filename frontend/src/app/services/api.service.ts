import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    private baseUrl = environment.apiUrl;
    private port = environment.apiPort;
    private limitPostsPerPage = environment.limitPostsPerPage;

    constructor(private http: HttpClient) {}

    getEvents(
        page: number = 1,
        limit: number = this.limitPostsPerPage
    ): Observable<any> {
        return this.http
            .get(
                `${this.baseUrl}:${this.port}/events?page=${page}&limit=${limit}`
            )
            .pipe(catchError(this.handleError));
    }

    postSelection(selection: any): Observable<any> {
        return this.http
            .post(`${this.baseUrl}:${this.port}/selections`, selection)
            .pipe(catchError(this.handleError));
    }

    getHistory(
        page: number = 1,
        limit: number = this.limitPostsPerPage
    ): Observable<any> {
        return this.http
            .get(
                `${this.baseUrl}:${this.port}/history?page=${page}&limit=${limit}`
            )
            .pipe(catchError(this.handleError));
    }

    getAllHistory(): Observable<any> {
        return this.http
            .get(`${this.baseUrl}:${this.port}/history`)
            .pipe(catchError(this.handleError));
    }

    private handleError(error: HttpErrorResponse): Observable<never> {
        let errorMessage = 'An error occurred';
        if (error.error instanceof ErrorEvent) {
            errorMessage = `Client-side error: ${error.error.message}`;
        } else {
            errorMessage = `Server-side error: ${error.status} - ${error.message}`;
        }
        return throwError(() => new Error(errorMessage));
    }
}
