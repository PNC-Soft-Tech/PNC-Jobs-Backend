# User Management API

This API provides endpoints for managing users, including creating, reading, updating, and deleting user records. It also includes authentication endpoints for user login.

## Base URL

https://easy-tution.vercel.app/api/v1

## Endpoints

### User Registration

#### POST `/users`

Creates a new user.

- **URL:** `/users`
- **Method:** `POST`
- **Request Body:**

  ```json
  {
    "username": "john_doe",
    "fname": "John",
    "lname": "Doe",
    "email": "john.doe@example.com",
    "phone": "1234567890",
    "password": "securepassword",
    "authType": "local",
    "otp": "123456",
    "isVerified": true,
    "institute": "Example University",
    "userType": "student",
    "dob": "1990-01-01",
    "dist": "Example District",
    "upzilla": "Example Upzilla",
    "div": "Example Division",
    "country": "BD",
    "pro_pic": "http://example.com/profile.jpg",
    "about_me": "Hello, I am John."
  }
