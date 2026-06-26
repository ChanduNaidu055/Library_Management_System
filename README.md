# Library Management System - RESTful API

A robust RESTful backend for a Library Management System utilizing Role-Based Access Control, JWT authentication, and MongoDB.

## Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (via Mongoose)
- **Security:** JWT, bcrypt

## Bonus Features Implemented
- Pagination, Search, and Category Filtering on `/api/books`
- Robust Refresh Token Authentication

## Project Setup & Installation

1. **Clone the repository:**
   ```bash
   git clone "https://github.com/ChanduNaidu055/Library_Management_System.git"
   cd library-management-system

```

2. **Install Dependencies:**
```bash
npm install

```


3. **Environment Variables:**
Create a `.env` file in the root folder with the following keys:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_secret

```


4. **Run the Project:**
```bash
npm run dev

```

## API Documentation

| Role | Method | Endpoint | Description |
| --- | --- | --- | --- |
| Public | `POST` | `/api/auth/register` | Register a new member |
| Public | `POST` | `/api/auth/login` | Login and get JWT |
| Librarian | `POST` | `/api/books` | Add a new book to the library |
| All | `GET` | `/api/books` | View all books (Supports `?page=1&limit=10&search=java&category=Tech`) |
| Librarian | `PUT` | `/api/books/:id` | Update book details |
| Librarian | `DELETE` | `/api/books/:id` | Delete a book |
| Member | `POST` | `/api/books/:id/borrow` | Borrow an available book |
| Member | `POST` | `/api/books/:id/return` | Return a borrowed book |
| Member | `GET` | `/api/members/me/books` | View all currently borrowed books |
| Librarian | `GET` | `/api/members` | View all registered members |
| Librarian | `DELETE` | `/api/members/:id` | Delete a member's account |

```