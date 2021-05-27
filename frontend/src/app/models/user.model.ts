export class User {
  constructor(
    public _id: string = "1",
    public email: string = "missing email frontend",
    public username: string = "missing username frontend",
    public isAdmin: boolean = false
    ){}
}