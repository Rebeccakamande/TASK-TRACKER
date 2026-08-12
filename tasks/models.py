from django.db import models

class Task(models.Model):
    class Status(models.TextChoices):
        TO_DO = 'TD', 'To do'
        IN_PROGRESS = 'IP', 'In progress'
        DONE = 'D', 'Done'

    title = models.CharField(max_length=100, blank=False)
    description = models.TextField()
    status = models.CharField(
        max_length=2,
        choices=Status,
        default=Status.TO_DO)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
