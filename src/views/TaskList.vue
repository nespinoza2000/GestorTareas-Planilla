<template>
    <div class="container">
        <h1>Lista de Tareas</h1>
        <button class="load-btn" @click="fetchTasks">Cargar Tareas</button>
        <div v-if="tasks.length > 0" class="task-list">
            <div v-for="task in tasks" :key="task.id" class="task-item">
                <div class="task-info">
                    <h3 :class="{ completed: task.completed }">{{ task.todo }}</h3>
                    <span class="task-status" :class="{ 'pending': !task.completed, 'completed': task.completed }">
                        {{ task.completed ? 'Completada' : 'Pendiente' }}
                    </span>
                </div>
                <div class="task-actions">
                    <button class="complete-btn" @click="toggleTaskCompletion(task)">
                        {{ task.completed ? 'Desmarcar' : 'Completar' }}
                    </button>
                    <button class="delete-btn" @click="deleteTask(task)">Eliminar</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "TaskList",
    data() {
        return {
            tasks: [],
            newTask: { todo: "Nueva tarea", completed: false },
        };
    },
    methods: {
        async fetchTasks() {
            try {
                const response = await fetch("https://dummyjson.com/todos");
                const data = await response.json();
                this.tasks = data.todos;
            } catch (error) {
                console.error("Error al cargar las tareas:", error);
            }
        },
        async addTask() {
            try {
                const response = await fetch("https://dummyjson.com/todos/add", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(this.newTask),
                });
                const data = await response.json();
                this.tasks.push(data);
            } catch (error) {
                console.error("Error al añadir la tarea:", error);
            }
        },
        async toggleTaskCompletion(task) {
            try {
                const response = await fetch(`https://dummyjson.com/todos/${task.id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ completed: !task.completed }),
                });
                const data = await response.json();
                task.completed = data.completed;
            } catch (error) {
                console.error("Error al actualizar la tarea:", error);
            }
        },
        async deleteTask(task) {
            try {
                await fetch(`https://dummyjson.com/todos/${task.id}`, {
                    method: "DELETE",
                });
                this.tasks = this.tasks.filter((t) => t.id !== task.id);
            } catch (error) {
                console.error("Error al eliminar la tarea:", error);
            }
        },
    },
};
</script>

<style scoped>
.container {
    max-width: 600px;
    margin: 0 auto;
    text-align: center;
}

h1 {
    font-size: 3em;
    color: darkblue;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
}

button {
    padding: 10px 20px;
    margin: 5px;
    cursor: pointer;
    border: none;
    border-radius: 5px;
    font-size: 1em;
}

.load-btn {
    background-color: #3498db;
    color: white;
}

.task-list {
    margin-top: 20px;
}

.task-item {
    background-color: #f9f9f9;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.task-info {
    flex-grow: 1;
}

.task-actions {
    display: flex;
    gap: 10px;
}

h3 {
    color: #333; /* Color neutro para el texto de la tarea */
}

h3.completed {
    text-decoration: line-through; /* Línea de tachado negra */
}

.task-status {
    display: inline-block;
    padding: 5px 10px;
    border-radius: 5px;
    font-weight: bold;
    margin-left: 10px;
}

.pending {
    background-color: orange; /* Color naranja para 'Pendiente' */
    color: white;
}

.completed {
    background-color: springgreen; /* Color springgreen para 'Completada' */
    color: white;
}

.complete-btn {
    background-color: #28a745; /* Verde */
    color: white;
    padding: 10px 15px;
    border-radius: 5px;
    border: none;
    cursor: pointer;
}

.complete-btn:hover {
    background-color: #218838; /* Verde más oscuro al pasar el ratón */
}

.delete-btn {
    background-color: #dc3545; /* Rojo */
    color: white;
    padding: 10px 15px;
    border-radius: 5px;
    border: none;
    cursor: pointer;
}

.delete-btn:hover {
    background-color: #c82333; /* Rojo más oscuro al pasar el ratón */
}
</style>
