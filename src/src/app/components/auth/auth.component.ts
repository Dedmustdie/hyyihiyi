import {Component, OnInit} from '@angular/core';
import {finalize, Observable, Subscription, switchMap, tap} from "rxjs";
import {OrderService} from "../../services/order.service";
import {IOrder} from "../../models/order";
import {IProduct} from "../../models/product";
import {IOrderItem} from "../../models/orderItem";
import {CartService} from "../../services/cart.service";
import {ICartItem} from "../../models/cartItem";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css', '../../../styles.css']
})
export class AuthComponent implements OnInit {
  constructor(
    private userService: UserService,
    private router: Router
  ) {}
  jwt$: Observable<string> = new Observable<string>()
  isInvalidUsername: boolean = true
  isInvalidPassword: boolean = true
  ngOnInit(): void {
  }
  loading = false
  username: string = ''
  password: string = ''

  login() {
    this.loading = true
    console.log("ewwewdwefwfwef");
    console.log(this.username)
    console.log(this.password)
    this.jwt$ = this.userService.getJWT(this.username, this.password)
      .pipe(tap((jwt) => {

        localStorage.setItem('auth_token', jwt)
        this.loading = false
        this.router.navigate(['/']);
      }))

    this.jwt$.subscribe((jwt) => {
      console.log("ewwefwef"+jwt);
    });

  }
  busy = false;
  loginError = false;
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
