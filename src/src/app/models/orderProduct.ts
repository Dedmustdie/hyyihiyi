import {IProduct} from "./product";

export interface IOrderProduct {
  count: number
  product: IProduct
  totalPrice: number
}
