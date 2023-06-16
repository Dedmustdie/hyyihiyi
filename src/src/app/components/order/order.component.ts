import {Component, Input} from "@angular/core";
import {IOrder} from "../../models/order";
import {IProduct} from "../../models/product";
import {Observable} from "rxjs";
import {IOrderItem} from "../../models/orderItem";
import {IOrderProduct} from "../../models/orderProduct";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['../../../styles.css']
})
export class OrderComponent {
  @Input()
  order: IOrder = {
    id: '',
    date: new Date(),
    price: 0,
    status: 'New',
    user_id: '',
    delivery_type: 'Courier',
    items: [],
  };

  @Input()
  products$: Observable<IProduct[]> = new Observable<IProduct[]>()
  isListVisible: boolean = false
  toggleList() {
    this.isListVisible = !this.isListVisible;
  }
  products: IProduct[] = []
  status: string = "Ошибка!"
  deliveryType: string = "Ошибка!"
  orderProducts: { totalSum: number; product: IProduct | undefined; count: number }[] = []
  orderProductError: boolean = false

  ngOnInit(): void {
    // 'New', /*новый*/
    // 'Processing', /*в обработке*/
    // 'Shipped', /*отправлен*/
    // 'Delivered', /*доставлен*/
    // 'Cancelled', /*отменен*/
    // 'Refunded' /*возмещен*/
    if (this.order.status == "New") {
      this.status = "В обработке"
    } else if (this.order.status == "Processing") {
      this.status = "В пути"
    } else if (this.order.status == "Shipped") {
      this.status = "Доставлен"
    }

    //     'Courier',
    //     'Mail'
    if (this.order.delivery_type == "Courier") {
      this.deliveryType = "Курьер"
    } else if (this.order.delivery_type == "Mail") {
      this.deliveryType = "Почта"
    }

    this.products$.subscribe((products: IProduct[]) => {
      this.orderProducts = this.order.items.map((item: IOrderItem) => {
        const product: IProduct | undefined = products.find((p: IProduct) => p.id === item.product_id);
        console.log(product?.name + "    " + product?.price + "  " + item.count )
        return {
          count: item.count,
          product: product,
          totalSum: item.count * product?.price!
        };
      });

      console.log(this.orderProducts)
      console.log(products)
    });
  }
}
