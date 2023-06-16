import {HttpClient, HttpErrorResponse, HttpParams} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {ErrorService} from "./error.service";
import {Injectable} from "@angular/core";
import {IOrder} from "../models/order";

@Injectable(/*{
  providedIn: 'root'
}*/)
export class OrderService {
  constructor(private http: HttpClient,
              private errorService: ErrorService) {

  }

  getAll(userId: string): Observable<IOrder[]> {
    console.log("fwefwefwe")
    return this.http.get<IOrder[]>(`api/order/allByUser?user_id=${userId}`).pipe(
      catchError(this.errorHandler.bind(this))
    )
  }

  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handle(error.message)
    return throwError(() => error.message)
  }
}
