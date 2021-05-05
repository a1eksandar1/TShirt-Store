## API

### /users route

| Request | Endpoint        | Description                 | Request parameters                          | Response parameters  |
|---------|-----------------|-----------------------------|---------------------------------------------|----------------------|
| GET     | /users          | Get all signed up users    |                                             | _id, email, username |
| POST    | /users/signup   | Sign up                     | email, username, password, level [optional] |                      |
| POST    | /users/login    | Login                       | email, password                             | token                |
| DELETE  | /users/{userId} | Delete user with _id=userId |                                             |                      |
| PATCH   | /users          | Change password             | email, currentPassword, newPassword         |                      |



  
### /tshirts route

| Request | Endpoint            | Description                                            | Request parameters                                                            | Response parameters                                    |
|---------|---------------------|--------------------------------------------------------|-------------------------------------------------------------------------------|--------------------------------------------------------|
| GET     | /tshirts            | Get all tshirts                                       |                                                                               | _id, tshirtName, price, stock [{size,quantity}], image |
| GET     | /tshirts/{tshirtId} | Get tshirt with _id=tshirtId                          |                                                                               | _id, tshirtName, price, stock [{size,quantity}], image |
| POST    | /tshirts            | Add new tshirt to database                             | **form-data** tshirtName, stock [{size,quantity [optional]}], price, image [optional]       | _id, tshirtName, stock [{size,quantity}], price, image |
| DELETE  | /tshirts/{tshirtId} | Delete tshirt with _id=tshirtId                        |                                                                               |                                                        |
| PATCH   | /tshirts/{tshirtId} | Update quantity/size/price of tshirt with _id=tshirtId | tshirtName [optional], stock [{size,quantity}] [optional], price [optional],  |                                                        |

### /orders route

| Request | Endpoint          | Description                   | Request parameters                         | Response parameters                             |
|---------|-------------------|-------------------------------|--------------------------------------------|-------------------------------------------------|
| GET     | /orders           | Gets all orders               |                                            | _id, tshirtId, userId, quantity, address, phone |
| GET     | /orders/{orderId} | Gets order with _id=orderId   |                                            | _id, tshirtId, userId, quantity, address, phone |
| POST    | /orders           | Add new order                 | tshirtId, userId, quantity, address, phone | _id, tshirtId, userId, quantity, address, phone |
| DELETE  | /orders/{orderId} | Delete order with _id=orderId |                                            |                                                 |


**Use Authorization header set to *"Bearer "+ token* when sending requests (most of them wont work without this)**