# Mini Task Tracker

A simple task management application built with Django for the **ICT Intern – Software Developer Take-Home Assignment at Amref Health Africa**.

The application allows users to manage tasks with a title, description, and status.

## Current Project Setup

The project currently includes:

* Django project setup
* `tasks` Django application
* `Task` model
* Task status choices:

  * To Do
  * In Progress
  * Done
* Required task title
* SQLite database
* Environment variable configuration using `.env`
* `.gitignore` configuration
* Database migrations

## Technologies

* Python
* Django 6.1
* SQLite
* python-dotenv

## Task Model

Each task currently contains:

* **Title** — required
* **Description**
* **Status** — To Do, In Progress, or Done

## API

The backend currently provides endpoints for managing tasks:

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/tasks/create/` | Create a task |
| GET | `/api/tasks/` | List all tasks |
| PATCH | `/api/tasks/<id>/` | Update a task |
| DELETE | `/api/tasks/<id>/delete/` | Delete a task |

The API communicates using JSON.

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

The project is currently under development.

The backend API and CRUD functionality have been implemented and tested. The frontend will be added in the next stage and will communicate with the backend API over HTTP using JavaScript and JSON.

