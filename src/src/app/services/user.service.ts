import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, map, Observable, of, throwError} from "rxjs";
import {ErrorService} from "./error.service";
import {Injectable} from "@angular/core";
import {IProduct} from "../models/product";
import {IJWT} from "../models/jwt";

@Injectable(/*{
  providedIn: 'root'
}*/)
export class UserService {
  constructor(private http: HttpClient,
              private errorService: ErrorService) {

  }

  getJWT(username: string, password: string): Observable<IJWT> {
    return this.http.post<IJWT>('/api/auth/jwt', {
      username: username,
      password: password
    }).pipe(
      catchError(this.errorHandler.bind(this))
    )
  }

  checkJWT(token: string): Observable<boolean> {
    return this.http.get<null>(`/api/auth/checkjwt?jwt=${token}`).pipe(
      map(() => true),
      catchError((error: any): Observable<boolean> => of(false))
    );
  }

  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handle(error.message)
    return throwError(() => error.message)
  }
}
