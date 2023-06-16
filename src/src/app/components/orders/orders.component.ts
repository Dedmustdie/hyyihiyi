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
  userId = "1"

  constructor(private orderService: OrderService, private catalogService: CatalogService) {
  }

  ngOnInit(): void {
    this.loading = true
    this.orders$ = this.orderService.getAll(this.userId)
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
      console.log(uniqueProductsId)

      this.products$ = this.catalogService.getSome(uniqueProductsId)
        .pipe(tap(() => {
          this.loading = false
        }))
      console.log(orders);
    });
  }
}
