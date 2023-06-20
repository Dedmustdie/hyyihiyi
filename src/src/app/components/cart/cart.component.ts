import {Component, OnInit} from '@angular/core';
import {Observable, tap} from "rxjs";
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
  selectedCartItems: ICartItem[] = []
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

  checkout() {
    const userId = localStorage.getItem('user_id')
    console.log(this.selectedCartItems)
    if (userId) {
      this.orderService.add(userId, this.deliveryType, this.selectedCartItems)
    }
  }

  constructor(private cartService: CartService, private catalogService: CatalogService, private orderService: OrderService) {
  }

  refreshCartItems = () => {
    this.loading = true;
    const userId = localStorage.getItem('user_id')
    if (userId) {
      this.cartItems$ = this.cartService.getAll(userId).pipe(
        tap(() => {
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
  }

  ngOnInit(): void {
    this.loading = true
    const userId = localStorage.getItem('user_id')
    if (userId) {
      this.cartItems$ = this.cartService.getAll(userId)
        .pipe(tap(() => {
          this.loading = false
        }))
      this.cartItems$.subscribe((cartItems) => {
        this.products$ = this.catalogService.getSome(cartItems.map((item: ICartItem) => item.product_id))
          .pipe(tap((sas) => {
            this.loading = false
          }))
      });
    }
  }
}
