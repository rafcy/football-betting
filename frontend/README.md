# Football Betting Frontend

This project is the frontend for a football betting application built with Angular. It allows users to view events, betting history, and interact with APIs for football betting odds.

## Prerequisites

Before you begin, ensure you have the following installed:

-   Node.js (v16 or above): Download Node.js
-   Angular CLI: Install globally via:
    ```
    npm install -g @angular/cli
    ```

## Setup and Installation

1. Install Dependencies:

    ```
    npm install
    ```

2. Set Environment Variables:

    Update the src/environments/environment.ts file with your desired API settings.

    Here’s the default configuration:

    | Variable            | Descriptions                                | Default Value    |
    | :------------------ | :------------------------------------------ | :--------------- |
    | `production`        | flag for production or development mode     | false            |
    | `apiUrl`            | Base URL of the backend API                 | http://localhost |
    | `apiPort`           | Port number of the backend API              | 3000             |
    | `limitPostsPerPage` | Number of posts or items displayed per page | 5                |

3. Start the Development Server:

    ```
    ng serve
    ```

    The application will be accessible at http://localhost:4200.
