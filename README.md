# User Management API

This API provides endpoints for managing users, including creating, reading, updating, and deleting user records. It also includes authentication endpoints for user login.

## Base URL

https://pnc-jobs-server.vercel.app/api/v1

### exam types

## /exam-types[POST] create exam-types

```
{
    "name":"Software Engineer",
    "slug":"software-engin"
}

```

## /exam-types[PUT] update exam-types

## /exam-types[GET] gel all exam-types

## /exam-types/:id[GET] gel single exam-types

## /exam-types/:id [DELETE] delete exam-types

### Generate contest

## /contests/generate-contest[GET] create generate contest

### payload body

```
{
  "title": "contest 2",
  "description": "description goes here...",
  "startContest": "2024-09-03T14:25:36.937Z",
  "endContest": "2024-09-05T14:25:36.937Z",
  "totalMarks": 50,
  "totalQuestions": 100,
  "totalTime": 60,
  "questions": [
    {
      "category": "66be1c8fc1762c2bb11cdc29",
      "subCategory": "66bdd3496e118d3fed2d495f",
      "no_of_ques": 10
    }
  ]
}



```

### response body

```
{
  "success": true,
  "message": "Contest generated successfully",
  "data": {
    "name": "contest-1",
    "description": "test",
    "questions": [
      "66d2878f986a99f77d40a01a",
      "66d286d4986a99f77d40a014",
      "66d27f1afe52ddc16c17697a",
      "66d304ab6767f7e739027fb5",
      "66d2d58171843aacf902d0c8",
      "66d287c6375b9585e2ba9748",
      "66d28981986a99f77d40a075",
      "66d2802d81b5d03bfe6b2e1b",
      "66d28a61375b9585e2ba9752",
      "66d282d38e64411388fbf156",
      "66d374ca54a9547470b50195",
      "66d3771c488a521a0a8def39",
      "66d305f46767f7e739028128",
      "66d3c15136f9334ec556bc1b",
      "66d3721f513121e3e62e5fcd",
      "66d370b394ff3c182f0a0f26",
      "66d3c83b2ebdab52c5be22a1",
      "66d43f6f71b7051a167ae376",
      "66d3054ee7c3357d8df83df3",
      "66d3c10136f9334ec556ba97",
      "66d376f3aa02455678d39418",
      "66d42c8713dd52961185258c",
      "66d440d8e80db88bc37151ec",
      "66d44043e80db88bc3715025",
      "66d4359aec4c1a9c8315461d",
      "66d3c7f32ebdab52c5be21d5",
      "66d43bb2ac9c7d67d346c980"
    ],
    "startContest": "2024-09-01T10:25:49.723Z",
    "endContest": "2024-09-02T10:25:49.723Z",
    "totalMarks": 60,
    "totalTime": 60,
    "_id": "66d441317a0659a347727258",
    "createdAt": "2024-09-01T10:25:54.033Z",
    "updatedAt": "2024-09-01T10:25:54.033Z",
    "__v": 0
  }
}


```

### Job categories

## /job-categories[POST] create job-categories

```
{
    "name":"Software Engineer",
    "slug":"software-engin"
}

```

## /job-categories[PUT] update job-categories

## /job-categories[GET] gel all job-categories

## /job-categories/name/:name[GET] gel single job-categories by name

## /job-categories/:id[GET] gel single job-categories

## /job-categories/:id [DELETE] delete job-categories

### Job circular

## /job-circulars[POST] create job-circulars

```
{
    "title": "Software Engineer",
    "company": "Tech Corp",
    "jobCategory": "66d95e4ec36c374442a39f9c", // Replace with an actual ObjectId from JobCategory collection
    "deadline": "2024-12-31T00:00:00.000Z",
    "link": "https://example.com/software-engineer"
  }
```

## /job-circulars[PUT] update job-circulars

## /job-circulars[GET] gel all job-circulars

## /job-circulars/name/:name[GET] gel single job-circulars by name

## /job-circulars/:id[GET] gel single job-circulars

## /job-circulars/:id [DELETE] delete job-circulars

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

## /attendees/check/:userId/:questionId/:contestId"[POST] check attendees

# for checked

```
success:true
data:{}
```

# for not checked/ not attend

```
success:false
```

## /attendees[POST] create attendees

```
{
  "question": "64dfc1a5f1c4d2b6f5e8a9c1", // Example ObjectId for the question
  "user": "64dfc1a5f1c4d2b6f5e8a9c2", // Example ObjectId for the user
  "contest": "64dfc1a5f1c4d2b6f5e8a9c3", // Example ObjectId for the model
  "selectedAnswer": "a" // Answer selected by the user
}
```

## /attendees[PUT] update attendees

## /attendees[GET] gel all attendees

## /attendees/:id[GET] gel single attendees

## /attendees/:id [DELETE] delete attendees

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
