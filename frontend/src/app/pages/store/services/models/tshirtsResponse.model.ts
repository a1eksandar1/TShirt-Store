import { TShirt } from "src/app/models/tshirt.model";

export interface tshirtsResponse {
  numberOfTshirts: number, 
  tshirtsAvailable: TShirt[]
}