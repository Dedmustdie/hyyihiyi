import {HttpClient, HttpErrorResponse, HttpParams} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {ErrorService} from "./error.service";
import {Injectable} from "@angular/core";
import {IProduct} from "../models/product";

@Injectable(/*{
  providedIn: 'root'
}*/)
export class CatalogService {
  constructor(private http: HttpClient,
              private errorService: ErrorService) {

  }

  getAll(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>('/api/catalog/product/all').pipe(
      catchError(this.errorHandler.bind(this))
    )
  }

  getSome(productsId: string[]): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`/api/catalog/product/some?products_id=${productsId.join(',')}`).pipe(
      catchError(this.errorHandler.bind(this))
    )
  }

  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handle(error.message)
    return throwError(() => error.message)
  }
}
