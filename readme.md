# Mini Task Tracker

A simple full-stack task management application built with Django for the **ICT Intern – Software Developer Take-Home Assignment at Amref Health Africa**.

The application allows users to create, view, update, and delete tasks through a browser-based interface. The frontend communicates with the Django backend through HTTP requests and receives task data as JSON.

## Technologies

- Python
- Django 6.1
- SQLite
- HTML
- CSS
- JavaScript
- Bootstrap 5
- python-dotenv

## Features

- Create a task with:
  - Title
  - Description
  - Status
- View all tasks
- Update task details and status
- Delete tasks
- Task title validation
- Task status validation
- Success and error messages
- Persistent data using SQLite
- Frontend communicates with the backend through HTTP requests
- JSON responses from the backend API

## Task Statuses

Tasks can have one of three statuses:

- To Do
- In Progress
- Done

## API Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/tasks/create/` | Create a task |
| GET | `/api/tasks/` | Retrieve all tasks |
| PATCH | `/api/tasks/<id>/` | Update a task |
| DELETE | `/api/tasks/<id>/delete/` | Delete a task |

The API returns JSON responses with appropriate HTTP status codes.

### Validation

The API currently validates:

- A task cannot be created without a title.
- The task status must be a valid status.
- Unsupported HTTP methods return a `405` response.
- Requests for tasks that do not exist return a `404` response.


## Setup and Installation

### 1. Clone the repository

```bash
git clone https://github.com/Rebeccakamande/TASK-TRACKER.git
cd TASK-TRACKER
```

### 2. Create a virtual environment

```bash
python -m venv venv
```

### 3. Activate the virtual environment

On Git Bash:

```bash
source venv/Scripts/activate
```

On Windows Command Prompt:

```cmd
venv\Scripts\activate
```

### 4. Install dependencies

```bash
python -m pip install -r requirements.txt
```

### 5. Configure environment variables

Create a `.env` file in the project root and add:

```env
SECRET_KEY=your-secret-key
DEBUG=True
```

The `.env` file is excluded from Git and should not be committed.

### 6. Apply migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

### 7. Run the development server

```bash
python manage.py runserver
```

The application will then be available at:

```text
http://127.0.0.1:8000/
```
## API Testing

The API has been manually tested using curl.

The following operations have been tested successfully:

- Creating a task
- Listing tasks
- Updating a task
- Deleting a task
- Rejecting an empty task title
- Rejecting an invalid task status
- Project Status

### Frontend and Backend

The application uses Django as the backend and provides JSON-based API endpoints for task operations.

The browser frontend uses JavaScript fetch() requests to communicate with these endpoints.

### Why Django?

Django was chosen because it is a framework I am comfortable working with and it provides the tools needed to build both the backend logic and database layer efficiently within the assignment's time constraints.

The frontend uses HTML, CSS, JavaScript, and Bootstrap to provide a simple interface for interacting with the API.

### Assumptions and Scope

The application is intentionally kept small and focused on the requirements of the take-home assignment.

Authentication and user-specific task ownership are not included because they were outside the stated requirements.

SQLite is used as the database because the assignment only requires persistent data and does not require a production database.

### Project Status

The core task management functionality is implemented, including the frontend, backend API, validation, and CRUD operations.

