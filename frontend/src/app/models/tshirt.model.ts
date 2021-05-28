export class TShirt {
  constructor(
    public _id: string = "1",
    public tshirtName: string = "Majica",
    public price: number = 1,
    public image: string = "",
    public comments: string[] = [],
    public ratingSum: number,
    public numberOfRatings: number,
    public agreeToShow: boolean
    ){}
}
