import {IOrderItem} from "./orderItem";

export interface IOrder {
  id: string
  date: Date
  price: number
  status: string
  user_id: string
  delivery_type: string
  items: IOrderItem[]
}
