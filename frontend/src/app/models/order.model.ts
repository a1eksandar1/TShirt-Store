export class Order {
  constructor(
    public _id: string = "1",
    public tshirtId: number = 1,
    public userId: number = 1,
    public quantity: number = 1,
    public address: string = "adresa",
    public phone: string = "555-555-555"
    ){}
}