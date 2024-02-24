# Raspberry Stocks Server

## Routes

### Watch List Routes

| Method | Route              | Description                  |
| ------ | ------------------ | ---------------------------- |
| GET    | /api/watchlist     | Returns all watchlist items  |
| POST   | /api/watchlist     | Creates a new watchlist item |
| DELETE | /api/watchlist/:id | Deletes the specified item   |

### Auth Routes

| Method | Route   | Description        |
| ------ | ------- | ------------------ |
| POST   | /signup | Creates a new user |
| POST   | /login  | Logs the user      |
| GET    | /verify | Verifies the JWT   |

## Models

### Watch List Item Model

```js
{
  title: String,
  tickerSymbol: String,
  typeOfAsset: String
}

```

### User Model

```js
{
  name: String
  email: String,
  password: String,
}
```
