import {Component, EventEmitter, Input, Output} from "@angular/core";
import {IProduct} from "../../models/product";
import {ICartItem} from "../../models/cartItem";
import {catchError, Observable, tap} from "rxjs";
import {ICartProduct} from "../../models/cartProduct";
import {CartService} from "../../services/cart.service";
import {CatalogService} from "../../services/catalog.service";
import {globalScriptsByBundleName} from "@angular-devkit/build-angular/src/webpack/utils/helpers";
import {LogicalFileSystem} from "@angular/compiler-cli";

@Component({
  selector: 'app-cart_item',
  templateUrl: './cartitem.component.html',
  styleUrls: ['../../../styles.css', 'cartitem.component.css']
})
export class CartItemComponent {
  @Input() products$: Observable<IProduct[]> = new Observable<IProduct[]>()
  @Input() cartItem: ICartItem = {product_id: '', count: 0}
  loading = true
  userId = "2"
  cartProduct: ICartProduct = {
    product: {
      id: '',
      name: '',
      price: 0,
      description: '',
      image: '',
      count: 0
    }, count: 1
  }
  @Output() selectedCartItemsChange = new EventEmitter<ICartItem[]>()
  @Input() selectedCartItems: ICartItem[] = []
  checkboxValue: boolean = false
  @Output() increasePrice = new EventEmitter<number>()
  @Output() decreasePrice = new EventEmitter<number>()
  @Output() setPrice = new EventEmitter<number>()
  @Input() refreshCartItems: (() => void)
  price: number = 0
  @Output() priceChange = new EventEmitter<number>()

  constructor(private cartService: CartService, catalogService: CatalogService) {
    this.refreshCartItems = () => {}
  }

  onCheckboxChange() {
    console.log(this.selectedCartItems)
    if (this.checkboxValue) {
      console.log("ДОБАВИТЬ")
      this.increasePrice.emit(this.price);
      this.selectedCartItems.push(this.cartItem)
      console.log(this.selectedCartItems)

    } else {
      console.log("УДАЛИТЬ")
      this.decreasePrice.emit(this.price);
      this.selectedCartItems = this.selectedCartItems.filter(item => item != this.cartItem)
      console.log(this.selectedCartItems)

    }
  }

  productCount: number = 1;


  increaseCount() {
    this.price += (this.cartProduct.product?.price ?? 0)
    if (this.checkboxValue)
      this.increasePrice.emit(this.cartProduct.product?.price);
    this.productCount++;
  }

  decreaseCount() {
    if (this.productCount > 1) {
      this.price -= (this.cartProduct.product?.price ?? 0)
      if (this.checkboxValue)
        this.decreasePrice.emit(this.cartProduct.product?.price);
      this.productCount--;
    }
  }

  rmFromCart() {
    this.loading = true

    this.cartService.remove(this.userId, this.cartItem.product_id)
      .pipe(
        tap(response => {
          this.loading = false
          this.refreshCartItems();
        }),
        catchError(error => {
          // Handle the error
          console.error('Add failed', error);
          throw error; // Rethrow the error to propagate it
        })
      )
      .subscribe();
  }

  ngOnInit()
    :
    void {
    this.loading = true

    this.products$.subscribe((products) => {
      console.log("hyytiyt" + products)
      if (products && this.cartItem.product_id) {
        this.cartProduct = {
          count: this.cartItem.count,
          product: products.find((product: IProduct) => product.id === this.cartItem.product_id) || {
            id: '',
            name: '',
            price: 0,
            description: '',
            image: '',
            count: 0
          }
        };
        this.price = (this.cartProduct.product?.price ?? 1)
      }
      //
      // this.cartProduct = {count: this.cartItem.count,
      //   product: products.find((product : IProduct) => product.id === this.cartItem.product_id)}
    });
  }
}
