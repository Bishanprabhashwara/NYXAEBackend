# T-Shirt Store Backend API

A layered Express.js backend for a T-shirt e-commerce website with full CRUD operations.

## Features

- **Layered Architecture**: Clean separation of concerns with Model, Repository, Service, and Controller layers
- **CRUD Operations**: Complete Create, Read, Update, Delete functionality for T-shirts
- **Advanced Search**: Search by name, description, or product ID
- **Filtering**: Filter by size, color, and price range
- **Pagination**: Paginated results with sorting options
- **Input Validation**: Comprehensive validation using Joi
- **Error Handling**: Centralized error handling with proper HTTP status codes
- **Security**: CORS, Helmet for security headers
- **Logging**: Morgan for request logging

## T-Shirt Model

The T-shirt model includes the following fields:
- `productId`: Unique product identifier (string, required)
- `name`: T-shirt name (string, required, max 100 chars)
- `thumbnailImage`: Main product image URL (string, required)
- `otherImages`: Array of additional image URLs (array of strings)
- `description`: Product description (string, required, max 1000 chars)
- `price`: Product price (number, required, min 0)
- `quantity`: Available stock (number, required, min 0)
- `sizes`: Available sizes (array of enums: XS, S, M, L, XL, XXL, 3XL)
- `colors`: Available colors (array of strings, required)

## API Endpoints

### Basic CRUD
- `POST /api/tshirts` - Create a new T-shirt
- `GET /api/tshirts` - Get all T-shirts (with pagination)
- `GET /api/tshirts/:id` - Get T-shirt by ID
- `PUT /api/tshirts/:id` - Update T-shirt by ID
- `DELETE /api/tshirts/:id` - Delete T-shirt by ID

### Special Endpoints
- `GET /api/tshirts/product/:productId` - Get T-shirt by product ID
- `GET /api/tshirts/search?q=query` - Search T-shirts
- `GET /api/tshirts/size/:size` - Get T-shirts by size
- `GET /api/tshirts/color/:color` - Get T-shirts by color
- `GET /api/tshirts/price-range?minPrice=x&maxPrice=y` - Get T-shirts by price range

### Health Check
- `GET /health` - Server health check

## Query Parameters

### For GET /api/tshirts:
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10, max: 100)
- `sortBy`: Sort field (createdAt, updatedAt, name, price, quantity)
- `sortOrder`: Sort order (asc, desc)

## Example Requests

### Create T-shirt
```bash
POST /api/tshirts
Content-Type: application/json

{
  "productId": "TSH001",
  "name": "Classic Cotton T-Shirt",
  "thumbnailImage": "https://example.com/image1.jpg",
  "otherImages": ["https://example.com/image2.jpg", "https://example.com/image3.jpg"],
  "description": "Comfortable 100% cotton t-shirt perfect for everyday wear",
  "price": 29.99,
  "quantity": 50,
  "sizes": ["S", "M", "L", "XL"],
  "colors": ["Black", "White", "Navy", "Gray"]
}
```

### Get All T-shirts with Pagination
```bash
GET /api/tshirts?page=1&limit=5&sortBy=price&sortOrder=asc
```

### Search T-shirts
```bash
GET /api/tshirts/search?q=cotton
```

### Get T-shirts by Size
```bash
GET /api/tshirts/size/M
```

## Project Structure

```
src/
├── config/
│   └── database.js          # Database connection
├── controllers/
│   └── TshirtController.js  # HTTP request handlers
├── middleware/
│   ├── errorHandler.js      # Centralized error handling
│   └── validation.js        # Input validation middleware
├── models/
│   └── Tshirt.js           # Mongoose model
├── repositories/
│   └── TshirtRepository.js # Data access layer
├── routes/
│   └── tshirtRoutes.js     # API routes
├── services/
│   └── TshirtService.js    # Business logic layer
└── app.js                  # Express app setup
```

## Setup and Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
Create a `.env` file with:
```
PORT=3000
MONGODB_URI=mongodb+srv://proposemee_db:ProposeMee%40AdminDb2025@cluster0.wn6umby.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
NODE_ENV=development
```

3. Start the server:
```bash
# Development mode with nodemon
npm run dev

# Production mode
npm start
```

## Technology Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB Atlas** - Cloud database
- **Mongoose** - ODM for MongoDB
- **Joi** - Input validation
- **Helmet** - Security middleware
- **CORS** - Cross-origin resource sharing
- **Morgan** - HTTP request logger
- **Dotenv** - Environment variable management

## Error Responses

All errors follow this format:
```json
{
  "success": false,
  "message": "Error description",
  "errors": ["Detailed error messages (for validation errors)"]
}
```

## Success Responses

Success responses follow this format:
```json
{
  "success": true,
  "message": "Operation description",
  "data": {...},
  "pagination": {...} // For paginated responses
}
```
