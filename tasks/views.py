from django.http import JsonResponse
import json
from django.shortcuts import get_object_or_404
from django.shortcuts import render
from .models import Task

def task_page(request):
    return render(request, "tasks/task.html")

def create_task(request):
    if request.method != "POST":
        return JsonResponse(
            {"error": "Only POST requests are allowed."},
            status=405
        )

    data = json.loads(request.body)

    title = data.get("title", "").strip()
    description = data.get("description", "").strip()
    status = data.get("status", Task.Status.TO_DO)

    # title validation
    if not title:
        return JsonResponse(
            {"error": "Task title cannot be empty."},
            status=400
        )

    valid_status = [choice[0] for choice in Task.Status.choices]

    if status not in valid_status:
        return JsonResponse(
            {"error": "Invalid task status."},
            status=400
        )

    task = Task.objects.create(
        title=title,
        description=description,
        status=status
    )

    return JsonResponse(
        {
            "message": "Task created successfully.",
            "task": {
                "id": task.id,
                "title": task.title,
                "description": task.description,
                "status": task.status
            }
        },
        status=201
    )

def list_tasks(request):
    if request.method != "GET":
        return JsonResponse(
            {"error": "Only GET requests are allowed."},
            status=405
        )

    tasks = Task.objects.all()

    task_data = [
        {
            "id": task.id,
            "title": task.title,
            "description": task.description,
            "status": task.status,
        }
        for task in tasks
    ]

    return JsonResponse(
        {"tasks": task_data},
        status=200
    )

def update_task(request, pk):

    if request.method != "PATCH":
        return JsonResponse(
            {"error": "Only PATCH requests are allowed."},
            status=405
        )
    task = get_object_or_404(Task, pk=pk)

    data = json.loads(request.body)

    title = data.get("title", task.title).strip()
    description = data.get("description", task.description).strip()
    status = data.get("status", task.status)

    if not title:
        return JsonResponse(
            {"error": "Task title cannot be empty."},
            status=400
        )

    valid_status = [choice[0] for choice in Task.Status.choices]

    if status not in valid_status:
        return JsonResponse(
            {"error": "Invalid task status."},
            status=400
        )

    task.title = title
    task.description = description
    task.status = status
    task.save()

    return JsonResponse(
        {
            "message": "Task updated successfully.",
            "task": {
                "id": task.id,
                "title": task.title,
                "description": task.description,
                "status": task.status
            }
        },
        status=200
    )

def delete_task(request, pk): 
    if request.method != "DELETE":
        return JsonResponse(
            {"error": "Only DELETE requests are allowed."},
            status=405
    )
    task = get_object_or_404(Task, pk=pk) 

    task.delete()

    return JsonResponse({
        "message": "Task deleted successfully"
        }, status = 200)

