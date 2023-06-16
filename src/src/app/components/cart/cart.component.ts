import {Component, OnInit} from '@angular/core';
import {Observable, switchMap, tap} from "rxjs";
import {OrderService} from "../../services/order.service";
import {IOrder} from "../../models/order";
import {IProduct} from "../../models/product";
import {CatalogService} from "../../services/catalog.service";
import {IOrderItem} from "../../models/orderItem";
import {CartService} from "../../services/cart.service";
import {ICartItem} from "../../models/cartItem";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css', '../../../styles.css']
})
export class CartComponent implements OnInit {
  title = 'Корзина';
  loading = false
  products$: Observable<IProduct[]> = new Observable<IProduct[]>()
  cartItems$: Observable<ICartItem[]> = new Observable<ICartItem[]>()
  userId = "2"
  deliveryAddress: string = ''
  deliveryType: string = ''
  price: number = 0
  isNotEnough: boolean = true
  setPrice(price: number) {
    this.price = price
  }

  increasePrice(price: number) {
    this.price += price
  }

  decreasePrice(price: number) {
    this.price -= price
  }

  onSubmit() {

    // Обработка отправки формы
    // Выполнение действий для оформления заказа
  }
  constructor(private cartService: CartService, private catalogService: CatalogService) {
  }
  refreshCartItems = () => {
    this.loading = true;
    console.log("suka");
    this.cartItems$ = this.cartService.getAll(this.userId).pipe(
      tap(() => {
        console.log("dadadada");
        this.loading = false;
      })
    );
    this.cartItems$.subscribe((cartItems) => {
      this.products$ = this.catalogService.getSome(cartItems.map((item: ICartItem) => item.product_id)).pipe(
        tap((sas) => {
          this.loading = false;
        })
      );
    });
  }

  ngOnInit(): void {
    this.loading = true
    this.cartItems$ = this.cartService.getAll(this.userId)
      .pipe(tap(() => {
        this.loading = false
      }))
    console.log("mdmdmmdm")
    console.log(this.catalogService)
    this.cartItems$.subscribe((cartItems) => {
      console.log("che blyad")
      this.products$ = this.catalogService.getSome(cartItems.map((item: ICartItem) => item.product_id))
        .pipe(tap((sas) => {
          console.log("swefwefwef" + sas)
          this.loading = false
        }))
    });
  }
}
