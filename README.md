# User Management API

This API provides endpoints for managing users, including creating, reading, updating, and deleting user records. It also includes authentication endpoints for user login.

## Base URL

https://pnc-jobs-server.vercel.app/api/v1

### Contest

## /contests[POST] create contest

```
{
    "name": "JavaScript Basics Quiz",
    "description": "A quiz to test your knowledge of JavaScript fundamentals.",
    "questions": [
      "66be1229b2e18c923af935c3",
      "66be1229b2e18c923af935c3",
      "66be1229b2e18c923af935c3"
    ],
    "startContest": "2024-09-15T10:00:00Z",
    "endContest": "2024-09-15T11:00:00Z",
    "totalMarks": 100,
    "totalTime": 60
  }
```

## /contests[PUT] update contest

## /contests[GET] gel all contest

## /contests/name/:name[GET] gel single contest by name

## /contests/:id[GET] gel single contest

## /contests/:id [DELETE] delete contest

### model

## /models[POST] create model

```
{
  "name": "Math Quiz",
  "description": "A quiz to test basic arithmetic skills.",
  "questions": [
    "64dfc1a5f1c4d2b6f5e8a9c1", // Example ObjectId for Question 1
    "64dfc1a5f1c4d2b6f5e8a9c2"  // Example ObjectId for Question 2
  ]
}
```

## /models[PUT] update model

## /models[GET] gel all model

## /models/name/:name[GET] gel single model by name

## /models/:id[GET] gel single model

## /models/:id [DELETE] delete model

### attendee

## /attendees[POST] create answer

```
{
  "question": "64dfc1a5f1c4d2b6f5e8a9c1", // Example ObjectId for the question
  "user": "64dfc1a5f1c4d2b6f5e8a9c2", // Example ObjectId for the user
  "model": "64dfc1a5f1c4d2b6f5e8a9c3", // Example ObjectId for the model
  "selectedAnswer": "a" // Answer selected by the user
}
```

## /attendees[PUT] update answer

## /attendees[GET] gel all answer

## /attendees/:id[GET] gel single answer

## /attendees/:id [DELETE] delete answer

### answer

## /answers[POST] create answer

```
{
  "question": "64dfc1a5f1c4d2b6f5e8a9c1", // Example ObjectId for the question
  "user": "64dfc1a5f1c4d2b6f5e8a9c2", // Example ObjectId for the user
  "model": "64dfc1a5f1c4d2b6f5e8a9c3", // Example ObjectId for the model
  "selectedAnswer": "a" // Answer selected by the user
}
```

## /answers[PUT] update answer

## /answers[GET] gel all answer

## /answers/:id[GET] gel single answer

## /answers/:id [DELETE] delete answer

### question

## /questions[POST] create question

```
{
  "title": "What is the capital of France?",
  "options": [
    {
      "title": "Paris",
      "order": "a"
    },
    {
      "title": "London2",
      "order": "b"
    },
    {
      "title": "Berlin",
      "order": "c"
    },
    {
      "title": "Madrid",
      "order": "d"
    }
  ],
  "explanation": "Paris is the capital city of France.",
  "subCategory": "66bdd3496e118d3fed2d495f",
  "rightAnswer": "d"
}
```

## /questions[PUT] update question

## /questions[GET] gel all categories

## /questions/:id[GET] gel single question

## /questions/:id [DELETE] delete question

### subCategory

## /sub-categories[POST] create subCategory

```
{
    "name":"test",
    "slug":"test",
    "category":"66bd9942a1120f78a0024858"
}
```

## /sub-categories[PUT] update subCategory

## /sub-categories[GET] gel all categories

## /sub-categories/:id[GET] gel single subCategory

## /sub-categories/:id [DELETE] delete subCategory

### category

## /categories[POST] create category

```
{
    "name":"test1",
    "slug":"test"
}

```

## /categories[PUT] update category

## /categories[GET] gel all categories

## /categories/:id[GET] gel single category

## /categories/:id [DELETE] delete category

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

  }


  ### User Login
  ```

#### POST `/users/login`

Logs in a user and returns a JWT token.

- **URL:** `/users/login`
- **Method:** `POST`
- **Request Body:**

  ```json
  {
    "identifier": "john.doe@example.com",
    "password": "securepassword"
  }
  ```

```

```
