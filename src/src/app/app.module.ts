import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {RootComponent} from './components/root/root.component';
import {NavigationComponent} from "./components/navigation/navigation.component";
import {ProductComponent} from "./components/product/product.component";
import {HeaderComponent} from "./components/header/header.component";
import {FooterComponent} from "./components/footer/footer.component";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {ErrorService} from "./services/error.service";
import {ErrorComponent} from "./components/error/error.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CrmService} from "./services/crm.service";
import {CatalogService} from "./services/catalog.service";
import {RouterModule, Routes} from "@angular/router";
import {NotfoundComponent} from "./components/notfound/notfound.component";
import {ProductsComponent} from "./components/products/products.component";
import {OrderComponent} from "./components/order/order.component";
import {OrderService} from "./services/order.service";
import {OrdersComponent} from "./components/orders/orders.component";
import {CartComponent} from "./components/cart/cart.component";
import {CartService} from "./services/cart.service";
import {CartItemComponent} from "./components/cartItem/cartitem.component";
import {AuthComponent} from "./components/auth/auth.component";
import {RegisterComponent} from "./components/register/register.component";
import {UserComponent} from "./components/user/user.component";
import {UserService} from "./services/user.service";
import {JwtInterceptor} from "./services/jwt.interceptor";

const appRoutes: Routes = [
  {path: '', component: ProductsComponent},
  {path: 'orders', component: OrdersComponent},
  {path: 'cart', component: CartComponent},
  {path: 'auth', component: AuthComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'user', component: UserComponent},
  {path: '**', component: NotfoundComponent},
];

@NgModule({
  declarations: [
    RootComponent,
    NavigationComponent,
    ProductComponent,
    HeaderComponent,
    FooterComponent,
    ErrorComponent,
    NotfoundComponent,
    ProductsComponent,
    OrderComponent,
    OrdersComponent,
    CartComponent,
    CartItemComponent,
    AuthComponent,
    RegisterComponent,
    UserComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    FormsModule
  ],
  providers: [
    ErrorService,
    CrmService,
    CatalogService,
    OrderService,
    CartService,
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }],
  bootstrap: [RootComponent]
})
export class AppModule {
}
