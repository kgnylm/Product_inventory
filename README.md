# Product Inventory API

This project provides a RESTful API for product inventory management. It is developed using Express.js and MongoDB.

## Features

- Product Create, Read, Update, and Delete (CRUD) operations
- MongoDB database integration
- Error handling
- Unit tests
- API documentation

## Installation

1. Clone the project:

```bash
git clone https://github.com/kgnylm/Product_inventory.git
cd product_inventory
```

2. Install dependencies:

```bash
npm install
```

3. Create `.env` file and set required variables:

```
MONGODB_URI=mongodb://localhost:27017/product_inventory
PORT=3000
NODE_ENV=development
```

4. Make sure MongoDB is running

5. Start the application:

```bash
# Development mode
npm run dev

# Production mode
npm start
```

## API Endpoints

- `POST /api/products` - Create a new product
- `GET /api/products` - List all products
- `GET /api/products/:id` - Get a specific product
- `PUT /api/products/:id` - Update product information
- `DELETE /api/products/:id` - Delete a product

## Tests

To run tests:

```bash
npm test
```

## License

ISC
