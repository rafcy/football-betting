# Backend (Express)

## Description

This is the backend for the football betting app. It provides three main endpoints:

-   `GET /events` - Retrieve all available football events.
-   `POST /selections` - Submit a selection for an event.
-   `GET /history` - Retrieve a specific user's selection history.

## Setup Instructions

1. Install dependencies:

    ```bash
    npm install
    ```

2. Rename .env.example to .env and update the variables based on information below

    Here’s the default configuration:

    | Variable       | Descriptions                   | Default Value    |
    | :------------- | :----------------------------- | :--------------- |
    | `BACKEND_PORT` | Port number of the backend API | 3000             |
    | `API_URL`      | Base URL of the backend API    | http://localhost |

3. Start the server:
    ```bash
    npm start
    ```
4. API Endpoints:
    - GET /events
        - Returns all available football events, excluding the ones already in history.
    - POST /selections
        - Body:
            ```
            {
               "eventId": 1,
               "selectedOutcome": "HOME"
            }
            ```
    - GET /history
        - Example: /history
        - Returns the user's selection history.
5. Default Port: http://localhost:3000

## Test the Backend

Test your backend using tools like [Postman](https://www.postman.com/) Example requests:

1. **Fetch events:**

    `GET http://localhost:3000/events`

2. **Submit a selection:**

    ```POST http://localhost:3000/selection
       Body:
       {
          "eventId": 15 ,
          "selectedOutcome": "HOME"
       }
    ```

3. **Fetch user history:**

    `GET http://localhost:3000/history`
