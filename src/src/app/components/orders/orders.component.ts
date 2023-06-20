  import {Component, OnInit} from '@angular/core';
import {Observable, switchMap, tap} from "rxjs";
import {OrderService} from "../../services/order.service";
import {IOrder} from "../../models/order";
import {IProduct} from "../../models/product";
import {CatalogService} from "../../services/catalog.service";
import {IOrderItem} from "../../models/orderItem";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['../../../styles.css']
})
export class OrdersComponent implements OnInit {
  title = 'Заказы';
  loading = false
  products$: Observable<IProduct[]> = new Observable<IProduct[]>()
  orders$: Observable<IOrder[]> = new Observable<IOrder[]>()

  constructor(private orderService: OrderService, private catalogService: CatalogService) {
  }


  ngOnInit(): void {
    this.loading = true
    const userId = localStorage.getItem('user_id')
    if (userId) {
      this.orders$ = this.orderService.getAll(userId)
        .pipe(tap(() => {
          this.loading = false
        }))

      this.orders$.subscribe((orders) => {
        const uniqueProductsId: string[] = []

        orders.forEach((order: IOrder) => {
          order.items.forEach((item: IOrderItem) => {
            if (!uniqueProductsId.includes(item.product_id)) {
              uniqueProductsId.push(item.product_id);
            }
          });
        });

        this.products$ = this.catalogService.getSome(uniqueProductsId)
          .pipe(tap(() => {
            this.loading = false
          }))
      });
    }
  }
}
