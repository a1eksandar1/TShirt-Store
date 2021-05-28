import { Order } from './../../../../models/order.model';

export interface getOrdersResponse {
  numberOfOrders: number,
  madeOrders: Order[]
}
