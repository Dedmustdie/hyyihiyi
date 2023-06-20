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
import {IJWT} from "../../models/jwt";

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
  jwt$: Observable<IJWT> = new Observable<IJWT>()
  isInvalidUsername: boolean = true
  isInvalidPassword: boolean = true
  ngOnInit(): void {
    const token = localStorage.getItem('auth_token')
    if (token) {
      this.userService.checkJWT(token)
        .pipe(tap((jwt) => {
        })).subscribe((isJwt) => {
          if (!isJwt) {
            this.router.navigate(['/user']);
          }
      })
    }
  }
  loading = false
  username: string = ''
  password: string = ''

  login() {
    this.loading = true
    this.jwt$ = this.userService.getJWT(this.username, this.password)
      .pipe(tap((jwt) => {
        console.log("dwdwe")
        console.log(jwt.user_id)
        localStorage.setItem('auth_token', jwt.token)
        localStorage.setItem('user_id', jwt.user_id)
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
