const API_URL = "http://localhost:8000/api/tasks";

const taskForm = document.getElementById("task-form");
const taskList = document.getElementById("task-list");

document.addEventListener("DOMContentLoaded", fetchTasks);

async function fetchTasks() {
    try {
        const response = await fetch(API_URL);
        const tasks = await response.json();
        renderTasks(tasks);
    } catch (error) {
        console.error("Erro ao carregar tarefas:", error);
    }
}

function renderTasks(tasks) {
    taskList.innerHTML = "";
    tasks.forEach(task => {
        const taskCard = document.createElement("div");
        taskCard.className = `task-item ${task.priority}`;
        taskCard.innerHTML = `
            <div>
                <h3>${task.title}</h3>
                <p>${task.description || "Sem descrição"}</p>
                <small>Prioridade: <strong>${task.priority}</strong> | Status: <strong>${task.status}</strong></small>
            </div>
            <div class="task-actions">
                <button class="btn btn-danger" onclick="deleteTask(${task.id})">Excluir</button>
            </div>
        `;
        taskList.appendChild(taskCard);
    });
}

taskForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const newTask = {
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        priority: document.getElementById("priority").value,
        status: document.getElementById("status").value
    };

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newTask)
        });

        if (response.ok) {
            taskForm.reset();
            fetchTasks();
        }
    } catch (error) {
        console.error("Erro ao salvar tarefa:", error);
    }
});

async function deleteTask(id) {
    if (!confirm("Deseja realmente remover esta tarefa?")) return;

    try {
        const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        if (response.ok) {
            fetchTasks();
        }
    } catch (error) {
        console.error("Erro ao deletar tarefa:", error);
    }
}
