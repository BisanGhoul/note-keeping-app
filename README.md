# Notes API

A RESTful API for managing notes with full CRUD operations, built with Node.js, Express, and MongoDB.

## Features

- **CRUD Operations**: Create, Read, Update, and Delete notes
- **Pagination**: Get notes in paginated format
- **Search**: Search through notes by title or content
- **Validation**: Input validation for all operations
- **Error Handling**: Comprehensive error handling
- **CORS Support**: Configured for cross-origin requests
- **MongoDB Integration**: Using Mongoose for data modeling

## Technologies Used

- Node.js
- Express.js
- MongoDB (with Mongoose)
- Dotenv (for environment variables)
- Morgan (for request logging)
- CORS (for cross-origin support)

## API Endpoints

| Method | Endpoint                | Description                          |
|--------|-------------------------|--------------------------------------|
| GET    | `/notes`                | Get all notes (paginated)            |
| GET    | `/notes/search`         | Search notes                         |
| GET    | `/notes/:noteID`        | Get a single note by ID              |
| POST   | `/notes`                | Create a new note                    |
| PUT    | `/notes/:noteID`        | Fully update a note                  |
| PATCH  | `/notes/:noteID`        | Partially update a note              |
| DELETE | `/notes/:noteID`        | Delete a note                        |

## Query Parameters

- `page`: Page number for pagination (default: 1)
- `limit`: Number of items per page (default: 10)
- `query`: Search term (for search endpoint)

## Request/Response Examples

**Create Note (POST /notes)**
```json
{
  "title": "Shopping List",
  "content": "Milk, Eggs, Bread"
}

[<img src="https://run.pstmn.io/button.svg" alt="Run In Postman" style="width: 128px; height: 32px;">](https://god.gw.postman.com/run-collection/25062971-794dcdc8-2d47-4a3d-a930-643723dd5718?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D25062971-794dcdc8-2d47-4a3d-a930-643723dd5718%26entityType%3Dcollection%26workspaceId%3Db2d2dae2-ec25-4286-82fc-fe9e7b50c474)
