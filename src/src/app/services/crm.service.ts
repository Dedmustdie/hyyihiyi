import {HttpClient, HttpErrorResponse, HttpParams} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {IProduct} from "../models/product";
import {ErrorService} from "./error.service";
import {Injectable} from "@angular/core";

@Injectable(/*{
  providedIn: 'root'
}*/)
export class CrmService {
  constructor(private http: HttpClient,
              private errorService: ErrorService) {

  }

  getVersion(): Observable<String> {
    return this.http.get('/shitaddon/shitaddon/', {responseType: 'text'}).pipe(
      catchError(this.errorHandler.bind(this))
    )
  }

  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handle(error.message)
    return throwError(() => error.message)
  }
}
