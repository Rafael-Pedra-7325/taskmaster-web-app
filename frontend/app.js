const isLocal = ["localhost", "127.0.0.1", ""].includes(window.location.hostname);
const API_URL = isLocal
    ? "http://localhost:8000/api/tasks"
    : "https://taskmaster-api-gmtn.onrender.com/api/tasks";

const taskForm = document.getElementById("task-form");
const taskList = document.getElementById("task-list");
const formTitle = document.getElementById("form-title");
const taskIdInput = document.getElementById("task-id");
const titleInput = document.getElementById("title");
const descriptionInput = document.getElementById("description");
const priorityInput = document.getElementById("priority");
const statusInput = document.getElementById("status");
const submitBtn = document.getElementById("submit-btn");
const cancelEditBtn = document.getElementById("cancel-edit-btn");

document.addEventListener("DOMContentLoaded", fetchTasks);
cancelEditBtn.addEventListener("click", resetFormMode);

function normalizePriorityClass(priority) {
    return (priority || "media")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
}

function showFeedback(message, isError = false) {
    taskList.innerHTML = "";
    const msgEl = document.createElement("p");
    msgEl.className = isError ? "feedback-msg feedback-error" : "feedback-msg";
    msgEl.textContent = message;
    taskList.appendChild(msgEl);
}

async function fetchTasks() {
    showFeedback("Carregando tarefas...");
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`Erro HTTP ${response.status}`);
        }
        const tasks = await response.json();
        renderTasks(tasks);
    } catch (error) {
        console.error("Erro ao carregar tarefas:", error);
        showFeedback("Não foi possível conectar à API. Se estiver usando plano gratuito, aguarde alguns segundos e recarregue a página.", true);
    }
}

function renderTasks(tasks) {
    if (!tasks.length) {
        showFeedback("Nenhuma tarefa cadastrada ainda. Crie sua primeira tarefa ao lado.");
        return;
    }

    taskList.innerHTML = "";

    tasks.forEach(task => {
        const taskCard = document.createElement("div");
        taskCard.className = `task-item ${normalizePriorityClass(task.priority)}`;

        const infoDiv = document.createElement("div");
        infoDiv.className = "task-info";

        const titleEl = document.createElement("h3");
        titleEl.textContent = task.title;

        const descEl = document.createElement("p");
        descEl.textContent = task.description || "Sem descrição";

        const metaDiv = document.createElement("div");
        metaDiv.className = "task-meta";

        const prioritySpan = document.createElement("span");
        prioritySpan.textContent = `Prioridade: ${task.priority}`;

        const statusLabel = document.createElement("label");
        statusLabel.textContent = "Status: ";

        const statusSelect = document.createElement("select");
        statusSelect.className = "status-select";
        ["Pendente", "Em Andamento", "Concluído"].forEach(optionValue => {
            const option = document.createElement("option");
            option.value = optionValue;
            option.textContent = optionValue;
            if (task.status === optionValue) {
                option.selected = true;
            }
            statusSelect.appendChild(option);
        });
        statusSelect.addEventListener("change", () => {
            updateTaskStatus(task.id, statusSelect.value);
        });

        statusLabel.appendChild(statusSelect);
        metaDiv.append(prioritySpan, statusLabel);
        infoDiv.append(titleEl, descEl, metaDiv);

        const actionsDiv = document.createElement("div");
        actionsDiv.className = "task-actions";

        const editBtn = document.createElement("button");
        editBtn.type = "button";
        editBtn.className = "btn btn-edit";
        editBtn.textContent = "Editar";
        editBtn.addEventListener("click", () => startEditTask(task));

        const deleteBtn = document.createElement("button");
        deleteBtn.type = "button";
        deleteBtn.className = "btn btn-danger";
        deleteBtn.textContent = "Excluir";
        deleteBtn.addEventListener("click", () => deleteTask(task.id));

        actionsDiv.append(editBtn, deleteBtn);
        taskCard.append(infoDiv, actionsDiv);
        taskList.appendChild(taskCard);
    });
}

function startEditTask(task) {
    taskIdInput.value = task.id;
    titleInput.value = task.title;
    descriptionInput.value = task.description || "";
    priorityInput.value = task.priority;
    statusInput.value = task.status;

    formTitle.textContent = "Editar Tarefa";
    submitBtn.textContent = "Salvar Alterações";
    cancelEditBtn.hidden = false;
    titleInput.focus();
}

function resetFormMode() {
    taskForm.reset();
    taskIdInput.value = "";
    formTitle.textContent = "Criar Nova Tarefa";
    submitBtn.textContent = "Adicionar Tarefa";
    cancelEditBtn.hidden = true;
}

taskForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const cleanedTitle = titleInput.value.trim();
    if (!cleanedTitle) {
        alert("Informe um título válido para a tarefa.");
        titleInput.focus();
        return;
    }

    const payload = {
        title: cleanedTitle,
        description: descriptionInput.value.trim() || null,
        priority: priorityInput.value,
        status: statusInput.value
    };

    const editingId = taskIdInput.value;
    const url = editingId ? `${API_URL}/${editingId}` : API_URL;
    const method = editingId ? "PUT" : "POST";

    submitBtn.disabled = true;

    try {
        const response = await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error(`Erro HTTP ${response.status}`);
        }

        resetFormMode();
        await fetchTasks();
    } catch (error) {
        console.error("Erro ao salvar tarefa:", error);
        alert("Erro ao salvar a tarefa. Verifique se o servidor está ativo.");
    } finally {
        submitBtn.disabled = false;
    }
});

async function updateTaskStatus(id, newStatus) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: newStatus })
        });

        if (!response.ok) {
            throw new Error(`Erro HTTP ${response.status}`);
        }
    } catch (error) {
        console.error("Erro ao atualizar status:", error);
        alert("Não foi possível atualizar o status da tarefa.");
        fetchTasks();
    }
}

async function deleteTask(id) {
    if (!confirm("Deseja realmente remover esta tarefa?")) return;

    try {
        const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        if (!response.ok) {
            throw new Error(`Erro HTTP ${response.status}`);
        }

        if (taskIdInput.value === String(id)) {
            resetFormMode();
        }
        await fetchTasks();
    } catch (error) {
        console.error("Erro ao deletar tarefa:", error);
        alert("Não foi possível excluir a tarefa.");
    }
}
