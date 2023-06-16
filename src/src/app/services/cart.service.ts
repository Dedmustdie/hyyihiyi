import {HttpClient, HttpErrorResponse, HttpParams} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {ErrorService} from "./error.service";
import {Injectable} from "@angular/core";
import {IProduct} from "../models/product";
import {ICartItem} from "../models/cartItem";

@Injectable(/*{
  providedIn: 'root'
}*/)
  export class CartService {
  constructor(private http: HttpClient,
              private errorService: ErrorService) {

  }

  getAll(userId: string): Observable<ICartItem[]> {
    return this.http.get<ICartItem[]>(`/api/cart/all?user_id=${userId}`).pipe(
      catchError(this.errorHandler.bind(this))
    )
  }

  getSome(productsId: string[]): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`/api/catalog/product/some?productsId=${productsId.join(',')}`).pipe(
      catchError(this.errorHandler.bind(this))
    )
  }

  add(userId: string, productId: string, count: number): Observable<any> {
    return this.http.post<any>('/api/cart/', {
      user_id: userId,
      product_id: productId,
      count: count
    }).pipe(
      catchError(this.errorHandler.bind(this))
    )
  }

  remove(userId: string, productId: string): Observable<any> {
    return this.http.delete<any>(`/api/cart?user_id=${userId}&product_id=${productId}`).pipe(
      catchError(this.errorHandler.bind(this))
    )
  }

  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handle(error.message)
    return throwError(() => error.message)
  }
}
