import {Component, OnInit} from '@angular/core';
import {Observable, tap} from "rxjs";
import {IProduct} from "../../models/product";
import {CatalogService} from "../../services/catalog.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html'
})
export class ProductsComponent implements OnInit {
  title = 'Каталог';
  loading = false
  products: IProduct[] = []
  products$: Observable<IProduct[]> = new Observable<IProduct[]>()

  constructor(private catalogService: CatalogService) {
  }

  ngOnInit(): void {
    this.loading = true
    this.products$ = this.catalogService.getAll()
      .pipe(tap(() => {
        this.loading = false
      }))

    this.products$.subscribe((products) => {
      console.log(products);
    });
  }
}
