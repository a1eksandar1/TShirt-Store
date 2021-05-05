## API

### /users route

| Request | Endpoint        | Description                 | Request parameters                          | Response parameters  |
|---------|-----------------|-----------------------------|---------------------------------------------|----------------------|
| GET     | /users          | Gets all signed up users    |                                             | _id, email, username |
| POST    | /users/signup   | Sign up                     | email, username, password, level [optional] |                      |
| POST    | /users/login    | Login                       | email, password                             | token                |
| DELETE  | /users/{userId} | Delete user with _id=userId |                                             |                      |
| PATCH   | /users          | Change password             | email, currentPassword, newPassword         |                      |



  
### /tshirts route

| Request | Endpoint            | Description                                            | Request parameters                                                            | Response parameters                                    |
|---------|---------------------|--------------------------------------------------------|-------------------------------------------------------------------------------|--------------------------------------------------------|
| GET     | /tshirts            | Gets all tshirts                                       |                                                                               | _id, tshirtName, price, stock [{size,quantity}], image |
| GET     | /tshirts/{tshirtId} | Gets tshirt with _id=tshirtId                          |                                                                               | _id, tshirtName, price, stock [{size,quantity}], image |
| POST    | /tshirts            | Add new tshirt to database                             | tshirtName, stock [{size,quantity [optional]}], price, image [optional]       | _id, tshirtName, stock [{size,quantity}], price, image |
| DELETE  | /tshirts/{tshirtId} | Delete tshirt with _id=tshirtId                        |                                                                               |                                                        |
| PATCH   | /tshirts/{tshirtId} | Update quantity/size/price of tshirt with _id=tshirtId | tshirtName [optional], stock [{size,quantity}] [optional], price [optional],  |                                                        |