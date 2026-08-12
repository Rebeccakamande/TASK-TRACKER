// CSRF TOKEN

function getCSRFToken() {
    return document.querySelector(
        "[name=csrfmiddlewaretoken]"
    ).value;
}

// LOAD TASKS

async function loadTasks() {

    const taskList =
        document.getElementById("task-list");

    try {

        const response =
            await fetch("/api/tasks/");

        const data =
            await response.json();


        taskList.innerHTML = "";

        if (data.tasks.length === 0) {

            taskList.innerHTML = `

                <div class="card shadow-sm">

                    <div class="empty-state">

                        <div class="empty-icon mb-3">

                            <i class="bi bi-clipboard-check"></i>

                        </div>

                        <h5>
                            No tasks yet
                        </h5>

                        <p class="text-muted mb-0">

                            Create your first task
                            using the form.

                        </p>

                    </div>

                </div>

            `;

            return;
        }


        data.tasks.forEach(task => {

            const taskElement =
                document.createElement("div");


            taskElement.className =
                "card shadow-sm mb-3 task-card";


            taskElement.innerHTML = `

                <div class="card-body p-4">

                    <div
                        class="d-flex
                        justify-content-between
                        align-items-start"
                    >

                        <div>

                            <h5 class="task-title mb-2">

                                ${task.title}

                            </h5>


                            <p class="task-description mb-0">

                                ${
                                    task.description ||
                                    "No description"
                                }

                            </p>

                        </div>


                        ${getStatusBadge(task.status)}

                    </div>


                    <div class="mt-4">

                        <button
                            class="btn
                            btn-sm
                            btn-outline-primary
                            me-2"
                            onclick="openEditModal(
                                ${task.id},
                                '${escapeQuotes(task.title)}',
                                '${escapeQuotes(task.description || "")}',
                                '${task.status}'
                            )"
                        >

                            <i class="bi bi-pencil me-1"></i>

                            Edit

                        </button>


                        <button
                            class="btn
                            btn-sm
                            btn-outline-danger"
                            onclick="deleteTask(${task.id})"
                        >

                            <i class="bi bi-trash me-1"></i>

                            Delete

                        </button>

                    </div>

                </div>

            `;

            taskList.appendChild(taskElement);

        });

    } catch (error) {

        console.error(error);

        taskList.innerHTML = `

            <div class="alert alert-danger">

                Unable to load tasks.
                Please try again.

            </div>
        `;

    }

}

// STATUS BADGE

function getStatusBadge(status) {

    const statuses = {

        "TD": {
            text: "To Do",
            className: "status-todo"
        },

        "IP": {
            text: "In Progress",
            className: "status-progress"
        },

        "D": {
            text: "Done",
            className: "status-done"
        }

    };

    const current =
        statuses[status] || {

            text: status,

            className: "status-todo"

        };

    return `

        <span
            class="badge
            status-badge
            ${current.className}"
        >

            ${current.text}

        </span>

    `;

}

// CREATE TASK

document
    .getElementById("task-form")
    .addEventListener(
        "submit",
        async function(event) {

            event.preventDefault();


            const title =
                document
                    .getElementById("title")
                    .value
                    .trim();


            const description =
                document
                    .getElementById("description")
                    .value
                    .trim();


            const status =
                document
                    .getElementById("status")
                    .value;


            if (!title) {

                showMessage(
                    "Task title cannot be empty.",
                    "danger"
                );

                return;

            }

            try {

                const response =
                    await fetch(
                        "/api/tasks/create/",
                        {

                            method: "POST",

                            headers: {

                                "Content-Type":
                                    "application/json",
                                    "X-CSRFToken": getCSRFToken()

                            },

                            body: JSON.stringify({

                                title: title,

                                description:
                                    description,

                                status: status

                            })

                        }
                    );

                const data =
                    await response.json();


                if (!response.ok) {

                    showMessage(
                        data.error ||
                        "Unable to create task.",
                        "danger"
                    );

                    return;

                }

                showMessage(
                    "Task created successfully.",
                    "success"
                );


                document
                    .getElementById("task-form")
                    .reset();


                loadTasks();

            } catch (error) {

                console.error(error);


                showMessage(
                    "Something went wrong. Please try again.",
                    "danger"
                );

            }

        }
    );

// OPEN EDIT MODAL

function openEditModal(
    id,
    title,
    description,
    status
) {
    document
        .getElementById("edit-task-id")
        .value = id;

    document
        .getElementById("edit-title")
        .value = title;

    document
        .getElementById("edit-description")
        .value = description;

    document
        .getElementById("edit-status")
        .value = status;

    document
        .getElementById("edit-title-error")
        .textContent = "";    

    const modal =
        new bootstrap.Modal(
            document.getElementById(
                "editTaskModal"
            )
        );

    modal.show();

}

// UPDATE TASK

async function updateTask() {

    const id =
        document
            .getElementById("edit-task-id")
            .value;

    const title =
        document
            .getElementById("edit-title")
            .value
            .trim();

    const description =
        document
            .getElementById("edit-description")
            .value
            .trim();

    const status =
        document
            .getElementById("edit-status")
            .value;

    const titleError = document.getElementById("edit-title-error");
    if (!title) {

        titleError.textContent =
            "Task title cannot be empty.";
        
        return;

    }

    titleError.textContent = "";

    try {

        const response =
            await fetch(
                `/api/tasks/${id}/`,
                {

                    method: "PATCH",

                    headers: {

                        "Content-Type":
                            "application/json",
                            "X-CSRFToken": getCSRFToken()

                    },

                    body: JSON.stringify({

                        title: title,

                        description:
                            description,

                        status: status

                    })

                }
            );

        const data =
            await response.json();


        if (!response.ok) {

            showMessage(
                data.error ||
                "Unable to update task.",
                "danger"
            );

            return;

        }

        const modalElement =
            document.getElementById(
                "editTaskModal"
            );

        const modal =
            bootstrap.Modal.getInstance(
                modalElement
            );

        modal.hide();


        showMessage(
            "Task updated successfully.",
            "success"
        );

        loadTasks();

    } catch (error) {

        console.error(error);

        showMessage(
            "Something went wrong. Please try again.",
            "danger"
        );

    }

}

// DELETE TASK

async function deleteTask(id) {

    const confirmed =
        confirm(
            "Are you sure you want to delete this task?"
        );

    if (!confirmed) {

        return;

    }

    try {

        const response =
            await fetch(
                `/api/tasks/${id}/delete/`,
                {

                    method: "DELETE",

                    headers: {
                        "X-CSRFToken": getCSRFToken()
                    }

                }
            );

        const data =
            await response.json();

        if (!response.ok) {

            showMessage(
                data.error ||
                "Unable to delete task.",
                "danger"
            );

            return;

        }

        showMessage(
            "Task deleted successfully.",
            "success"
        );

        loadTasks();

    } catch (error) {

        console.error(error);

        showMessage(
            "Something went wrong while deleting the task.",
            "danger"
        );

    }

}

// SHOW MESSAGE

function showMessage(message, type) {

    const messageContainer =
        document.getElementById("message");

    messageContainer.innerHTML = `

        <div
            class="alert
            alert-${type}
            alert-dismissible
            fade
            show"
            role="alert"
        >

            ${message}


            <button
                type="button"
                class="btn-close"
                data-bs-dismiss="alert"
            ></button>

        </div>

    `;

    setTimeout(function() {

        messageContainer.innerHTML = "";

    }, 3500);

}
// ESCAPE QUOTES

function escapeQuotes(text) {

    return text
        .replace(/\\/g, "\\\\")
        .replace(/'/g, "\\'");

}

// SAVE EDIT BUTTON
document
    .getElementById("save-edit-btn")
    .addEventListener(
        "click",
        updateTask
    );

// REFRESH

document
    .getElementById("refresh-btn")
    .addEventListener(
        "click",
        loadTasks
    );

// INITIAL LOAD

loadTasks();