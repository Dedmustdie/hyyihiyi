import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {ErrorService} from "./error.service";
import {Injectable} from "@angular/core";
import {IProduct} from "../models/product";

@Injectable(/*{
  providedIn: 'root'
}*/)
export class UserService {
  constructor(private http: HttpClient,
              private errorService: ErrorService) {

  }

  getJWT(username: string, password: string): Observable<string> {
    return this.http.post<string>('/api/auth/jwt', {
      username: username,
      password: password
    }).pipe(
      catchError(this.errorHandler.bind(this))
    )
  }

  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handle(error.message)
    return throwError(() => error.message)
  }
}
