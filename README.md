# Product Management Web App

A full-stack web application for managing products with user authentication, built using NestJS and React.

## Features

- User Authentication (JWT-based)
  - User Signup
  - User Login
  - Protected Routes
- Product Management
  - Create, Read, Update, Delete Products
  - Product Image Upload
  - Filter by Category, Price, Rating
  - Search by Name/Description
  - Pagination & Sorting
- Modern UI with Tailwind CSS
- Role-based Access Control

## Tech Stack

### Frontend
- React with TypeScript
- Redux Toolkit for State Management
- Tailwind CSS for Styling
- React Router for Navigation
- Axios for API Integration

### Backend
- NestJS with TypeScript
- MongoDB with Mongoose
- JWT Authentication
- File Upload Support
- RESTful API Design

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm (v8 or higher)
- MongoDB installed locally or MongoDB Atlas account

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd product-management-app
```

2. Install dependencies
```bash
npm run install:all
```

3. Set up environment variables
- Create `.env` file in backend directory
```env
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=3000
```

4. Start development servers

Backend:
```bash
npm run dev:backend
```

Frontend:
```bash
npm run dev:frontend
```

5. Access the application
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000

## Project Structure

```
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── features/       # Feature modules
│   │   ├── hooks/          # Custom hooks
│   │   ├── services/       # API services
│   │   └── store/          # Redux store
│
├── backend/                # NestJS backend
│   ├── src/
│   │   ├── auth/          # Authentication module
│   │   ├── products/       # Products module
│   │   ├── users/          # Users module
│   │   └── common/         # Shared resources
│
└── README.md              # Project documentation
```

## API Documentation

### Authentication Endpoints
- POST /api/auth/signup - Register new user
- POST /api/auth/login - User login

### Product Endpoints
- GET /api/products - Get all products
- POST /api/products - Create new product
- GET /api/products/:id - Get product by ID
- PUT /api/products/:id - Update product
- DELETE /api/products/:id - Delete product

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.