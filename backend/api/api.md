## API

### /users route

| Request | Endpoint                     | Description                  | Request parameters                          | Response parameters                                |
| ------- | ---------------------------- | ---------------------------- | ------------------------------------------- | -------------------------------------------------- |
| GET     | /users                       | Get all signed up users      |                                             | \_id, email, username, wishlist, isAdmin           |
| POST    | /users/signup                | Sign up                      | email, username, password, level [optional] |                                                    |
| POST    | /users/login                 | Login                        | email, password                             | token { \_id, email, username, wishlist, isAdmin } |
| POST    | /users/{userId}/addToWishlist | Add tshirt to wishlist       | tshirtId                                    | userId, tshirtId                                   |
| POST    | /users/{userId}/removeFromWishlist | Remove tshirt from wishlist       | tshirtId                                    | userId, tshirtId                                   |
| DELETE  | /users/{userId}              | Delete user with \_id=userId |                                             |                                                    |
| PATCH   | /users                       | Change password              | email, currentPassword, newPassword         |                                                    |

### /tshirts route

| Request | Endpoint                     | Description                                             | Request parameters                                | Response parameters                                  |
| ------- | ---------------------------- | ------------------------------------------------------- | ------------------------------------------------- | ---------------------------------------------------- |
| GET     | /tshirts                     | Get all tshirts                                         |                                                   | \_id, tshirtName, price, image, popularity, comments |
| GET     | /tshirts/{tshirtId}          | Get tshirt with \_id=tshirtId                           |                                                   | \_id, tshirtName, price, image, popularity, comments |
| POST    | /tshirts                     | Add new tshirt to database                              | **form-data** tshirtName, price, image [optional] | \_id, tshirtName, price, image, comments             |
| POST    | /tshirts/{tshirtId}/addRating | Add rating for tshirt                                   | rating                                            |                                                      |
| POST    | /tshirts/{tshirtName}        | Add comment on tshirt with tshirtName=tshirtName        | tshirtName, comment                               |                                                      |
| DELETE  | /tshirts/{tshirtId}          | Delete tshirt with \_id=tshirtId                        |                                                   |                                                      |
| PATCH   | /tshirts/{tshirtId}          | Update quantity/size/price of tshirt with \_id=tshirtId | tshirtName [optional], price [optional],          |                                                      |

### /orders route

| Request | Endpoint             | Description                    | Request parameters                                             | Response parameters                                                  |
| ------- | -------------------- | ------------------------------ | -------------------------------------------------------------- | -------------------------------------------------------------------- |
| GET     | /orders              | Gets all orders                |                                                                | \_id, tshirtId, userId, isCustomMade, size, quantity, address, phone |
| GET     | /orders/{orderId}    | Gets order with \_id=orderId   |                                                                | \_id, tshirtId, userId, isCustomMade, size, quantity, address, phone |
| GET     | /orders/user/{userId} | Gets all orders for given user |                                                                | numOfOrders, allOrders                                               |
| POST    | /orders              | Add new order                  | tshirtId, userId, isCustomMade, size, quantity, address, phone | \_id, tshirtId, userId, isCustomMade, size, quantity, address, phone |
| POST    | /orders/sendEmail              | Send email to user                  | userEmail  |
| DELETE  | /orders/{orderId}    | Delete order with \_id=orderId |                                                                |                                                                      |


### /shops route

| Request | Endpoint             | Description                    | Request parameters                                             | Response parameters                                                  |
| ------- | -------------------- | ------------------------------ | -------------------------------------------------------------- | -------------------------------------------------------------------- |
| GET     | /shops              | Gets all shops                |                                                                | numberOfShops,\_id, name, address, lat, lng, email |
| GET     | /shops/{shopId}    | Gets shop with \_id=shopId   |                                                                | \_id, name, address, lat, lng, email |
|
| POST    | /shops              | Add new shop                  | name, address, lat, lng, email | \_id, name, address, lat, lng, email |
| DELETE  | /shops/{shopId}    | Delete shop with \_id=shopId |                                                                |


**Use Authorization header set to _"Bearer "+ token_ when sending requests (most of them wont work without this)**
