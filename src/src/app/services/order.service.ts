import {HttpClient, HttpErrorResponse, HttpParams} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {ErrorService} from "./error.service";
import {Injectable} from "@angular/core";
import {IOrder} from "../models/order";
import {ICartItem} from "../models/cartItem";

@Injectable(/*{
  providedIn: 'root'
}*/)
export class OrderService {
  constructor(private http: HttpClient,
              private errorService: ErrorService) {

  }

  getAll(userId: string): Observable<IOrder[]> {
    return this.http.get<IOrder[]>(`/api/order/order/some?user_id=${userId}`).pipe(
      catchError(this.errorHandler.bind(this))
    )
  }

  add(userId: string, deliveryType: string, items: ICartItem[]): Observable<any> {
    return this.http.post<any>('/api/order/order/add', {
      user_id: userId,
      delivery_type: deliveryType,
      items: items
    }).pipe(
      catchError(this.errorHandler.bind(this))
    )
  }

  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handle(error.message)
    return throwError(() => error.message)
  }
}
