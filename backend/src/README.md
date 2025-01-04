# Backend (Express.js)

## Description
This is the backend for the football betting app. It provides three main endpoints:
- `GET /events` - Retrieve all available football events.
- `POST /selections` - Submit a user's selection for an event.
- `GET /history/:userId` - Retrieve a specific user's selection history.

## Setup Instructions

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the server:
    ```bash
   npm start
   ```
3. API Endpoints:
   - GET /events
      - Returns all available football events.
   - POST /selections
      - Body:
         ```
         {
            "userId": "user123",
            "eventId": 1,
            "selectedOutcome": "HOME"
         }
         ```
   - GET /history/:userId
      - Example: /history/user123
      - Returns the user's selection history.
4. Default Port: http://localhost:3000

## Test the Backend

Test your backend using tools like [Postman](https://www.postman.com/) Example requests:

1. **Fetch events:**

   ```GET http://localhost:3000/events```

2. **Submit a selection:**

   ```POST http://localhost:3000/selections Body: { "userId": "user123", "eventId": 1, "selectedOutcome": "HOME" } ```

3. **Fetch user history:**

   ```GET http://localhost:3000/history/user123```
