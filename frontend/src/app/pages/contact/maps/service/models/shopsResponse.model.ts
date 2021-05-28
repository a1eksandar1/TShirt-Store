import { Shop } from "src/app/models/shop.model";

export interface shopsResponse {
  numberOfShops: number,
  shopsAvailable: Shop[]
}
