import {Component, OnInit} from '@angular/core';
import {finalize, Observable, Subscription, switchMap, tap} from "rxjs";
import {OrderService} from "../../services/order.service";
import {IOrder} from "../../models/order";
import {IProduct} from "../../models/product";
// import {Catalog2Service} from "../../services/catalog2.service";
import {IOrderItem} from "../../models/orderItem";
import {CartService} from "../../services/cart.service";
import {ICartItem} from "../../models/cartItem";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  isAuth: boolean = false
  ngOnInit(): void {

  }
  // login() {
  //
  // }
  // busy = false;
  // username = '';
  // password = '';
  // loginError = false;
  // busy = false;
  // username = '';
  // password = '';
  // loginError = false;
  // private subscription: Subscription | null = null
  //
  // constructor(
  //   private route: ActivatedRoute,
  //   private router: Router,
  //   private authService: AuthService
  // ) {}
  //
  // ngOnInit(): void {
  //   this.subscription = this.authService.user$.subscribe((x) => {
  //     if (this.route.snapshot.url[0].path === 'login') {
  //       const accessToken = localStorage.getItem('access_token');
  //       const refreshToken = localStorage.getItem('refresh_token');
  //       if (x && accessToken && refreshToken) {
  //         const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';
  //         this.router.navigate([returnUrl]);
  //       }
  //     } // optional touch-up: if a tab shows login page, then refresh the page to reduce duplicate login
  //   });
  // }
  //
  // login() {
  //   if (!this.username || !this.password) {
  //     return;
  //   }
  //   this.busy = true;
  //   const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';
  //   this.authService
  //     .login(this.username, this.password)
  //     .pipe(finalize(() => (this.busy = false)))
  //     .subscribe(
  //       () => {
  //         this.router.navigate([returnUrl]);
  //       },
  //       () => {
  //         this.loginError = true;
  //       }
  //     );
  // }
  //
  // ngOnDestroy(): void {
  //   this.subscription?.unsubscribe();
  // }
}
