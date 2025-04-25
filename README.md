# Notes API

A RESTful API for managing notes with full CRUD operations, built with Node.js, Express, and MongoDB.

## Try It in Postman 

Click the button below to open the API in Postman and test the endpoints:

[<img src="https://run.pstmn.io/button.svg" alt="Run in Postman" width="150">](https://www.postman.com/aviation-operator-1999495/note-keeper-api/overview)

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

## Installation & Setup

### Prerequisites
- **Node.js** (v16+)
- **MongoDB** (You can use MongoDB Atlas for cloud hosting)

### 1. Clone the repository
```bash
git clone https://github.com/BisanGhoul/note-keeping-app.git
```

### 2. Install dependencies
```bash
cd note-keeping-app
npm install
```

### 3. Set up environment variables
replace the placeholders in the .env file with your actual username, password and db name
   ```env
  # MongoDB Atlas Connection
  DB_URI=mongodb+srv://<username>:<password>@node-fts.rlvcwsy.mongodb.net/<dbname>?retryWrites=true&w=majority&appName=node-fts  
  # Server Port (optional)
  PORT=3000
  ```

### 4. Start the server
```bash
npm run dev
```

The server will now be running on `http://localhost:3000`. or the port set in the .env file
## Project Structure

 **note-keeping-app**  
 ┣ 📂 **api**  
 ┃ ┣ 📂 **controllers**         - API Logic (CRUD)  
 ┃ ┣ 📂 **middleware**          - CORS & Error Handling  
 ┃ ┣ 📂 **routes**              - API Routes  
 ┃ ┣ 📂 **models**              - Mongoose Schema  
 ┃ ┣ 📂 **services**            - Business Logic (Pagination & Search)  
 ┣ 📜 **server.js**             - Server Setup  
 ┣ 📜 **app.js**                - Express App Initialization  



## Example Requests

### Create a Note
**POST /notes**
```json
{
  "title": "Sample Note",
  "content": "This is a sample note content."
}
```

**Response**
```json
{
  "message": "Note created successfully",
  "note": {
    "title": "Sample Note",
    "content": "This is a sample note content.",
    "_id": "62f60c3e3d7a790019cb46ba",
    "creationDate": "2025-03-28T23:26:38.666Z",
    "createdAt": "2025-03-28T23:26:38.697Z",
    "updatedAt": "2025-03-28T23:26:38.697Z",
    "__v": 0
  },
  "request": {
    "type": "GET",
    "url": "http://localhost:3000/notes/62f60c3e3d7a790019cb46ba"
  }
}
```

### Get All Notes
**GET /notes**
```json
{
  "page": 1,
  "limit": 10
}
```

**Response**
```json
{
  "notes": [
    {
      "_id": "62f60c3e3d7a790019cb46ba",
      "title": "Sample Note",
      "content": "This is a sample note content.",
      "createdAt": "2025-03-28T23:26:38.697Z",
      "updatedAt": "2025-03-28T23:26:38.697Z"
    }
  ],
  "metadata": {
    "currentPage": 1,
    "totalPages": 1,
    "totalCount": 1,
    "page": 1,
    "limit": 10
  },
  "request": {
    "type": "GET",
    "url": "http://localhost:3000/notes?page=1&limit=10"
  }
}
```

### Update a Note
**PUT /notes/:noteID**
```json
{
  "title": "Updated Title",
  "content": "Updated content for the note."
}
```

**Response**
```json
{
  "message": "Note updated successfully",
  "note": {
    "title": "Updated Title",
    "content": "Updated content for the note.",
    "_id": "62f60c3e3d7a790019cb46ba",
    "updatedAt": "2025-03-28T23:26:38.697Z"
  },
  "request": {
    "type": "GET",
    "url": "http://localhost:3000/notes/62f60c3e3d7a790019cb46ba"
  }
}
```

### Partially Update a Note
**PATCH /notes/:noteID**
```json
{
  "title": "Partially Updated Title"
}
```

**Response**
```json
{
  "message": "Note updated successfully",
  "note": {
    "title": "Partially Updated Title",
    "_id": "62f60c3e3d7a790019cb46ba",
    "updatedAt": "2025-03-28T23:26:38.697Z"
  },
  "request": {
    "type": "GET",
    "url": "http://localhost:3000/notes/62f60c3e3d7a790019cb46ba"
  }
}
```

### Delete a Note
**DELETE /notes/:noteID**

**Response**
```json
{
  "message": "Note deleted successfully",
  "deletedNote": {
    "_id": "62f60c3e3d7a790019cb46ba",
    "title": "Sample Note",
    "content": "This is a sample note content.",
    "createdAt": "2025-03-28T23:26:38.697Z",
    "updatedAt": "2025-03-28T23:26:38.697Z"
  }
}
```

## ⚠️Error Handling
All error responses will be returned with an appropriate status code and message in the following format:
```json
{
  "error": {
    "message": "Error message here"
  }
}
```





