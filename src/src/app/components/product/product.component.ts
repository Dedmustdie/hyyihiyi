import {Component, Input} from "@angular/core";
import {IProduct} from "../../models/product";
import {catchError, tap} from "rxjs";
import {CatalogService} from "../../services/catalog.service";
import {CartService} from "../../services/cart.service";
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['../../../styles.css', 'product.component.css']
})
export class ProductComponent {
  @Input() product: IProduct = {id: '', name: '', price: 0, description: '', image: '', count: 0}
  isListVisible: boolean = false
  details = false
  user_id = '2'
  loading = false
  isAlreadyInCart: boolean = true
  constructor(private cartService: CartService) {
  }
  toggleList() {
    this.isListVisible = !this.isListVisible;
  }
  addToCart() {
    this.loading = true

    this.cartService.add(this.user_id, this.product.id, 1)
      .pipe(
        tap(response => {
          this.loading = false
        }),
        catchError(error => {
          // Handle the error
          console.error('Add failed', error);
          throw error; // Rethrow the error to propagate it
        })
      )
      .subscribe();
  }
}
