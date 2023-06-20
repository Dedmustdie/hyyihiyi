import {Component, Input} from "@angular/core";
import {IProduct} from "../../models/product";
import {catchError, tap} from "rxjs";
import {CatalogService} from "../../services/catalog.service";
import {CartService} from "../../services/cart.service";
import {Router} from "@angular/router";
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['../../../styles.css', 'product.component.css']
})
export class ProductComponent {
  @Input() product: IProduct = {id: '', name: '', price: 0, description: '', image: '', count: 0}
  isListVisible: boolean = false
  details = false
  loading = false
  isAlreadyInCart: boolean = true
  constructor(private cartService: CartService, private router: Router) {
  }
  toggleList() {
    this.isListVisible = !this.isListVisible;
  }
  addToCart() {
    this.loading = true
    const userId = localStorage.getItem('user_id')
    if (userId) {
      this.cartService.add("1", this.product.id, 1)
        .pipe(
          tap(response => {
            this.loading = false
          }),
          catchError(error => {
            if (error.status == 401) {
              this.router.navigate(['/user']);
            }
            console.error('Add failed', error.status);
            throw error;
          })
        )
        .subscribe();
    } else {
      this.router.navigate(['/user']);
    }
  }
}
