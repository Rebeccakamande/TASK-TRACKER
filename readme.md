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

## Project Status

The project is currently under development. The frontend, task API, and CRUD functionality will be added in subsequent stages.
