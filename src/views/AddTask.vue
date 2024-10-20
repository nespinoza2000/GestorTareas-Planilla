<template>
    <div class="add-task-container">
        <h1 class="title">Añadir Tarea</h1>
        <div class="input-group">
            <input 
                v-model="newTask" 
                @keyup.enter="addTask" 
                placeholder="Añadir nueva tarea" 
                class="task-input" 
            />
            <button @click="addTask" class="add-button">Añadir</button>
        </div>
    
        <div v-if="tasks.length > 0" class="task-list">
            <div v-for="task in tasks" :key="task.id" class="task-item">
                <span :class="{ completed: task.completed }">{{ task.todo }}</span>
                <div class="task-actions">
                    <button @click="toggleTaskCompletion(task)" class="complete-button">
                        <img src="../assets/checkmark-circle-outline.svg" alt="Completar" class="icon"/>
                    </button>
                    <button @click="deleteTask(task)" class="delete-button">
                        <img src="../assets/trash-outline.svg" alt="Eliminar" class="icon"/>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "AddTask",
    data() {
        return {
            newTask: "", // Campo de entrada para la nueva tarea
            tasks: [],   // Lista de tareas locales
        };
    },
    methods: {
        addTask() {
            if (this.newTask.trim() === "") return;

            const newTask = {
                todo: this.newTask,
                completed: false,
                id: Date.now(), 
            };

            // Añadir la nueva tarea al inicio de la lista
            this.tasks.unshift(newTask);
            this.newTask = ""; // Limpiar el campo de entrada después de agregar
        },

        // Elimina una tarea específica de la lista
        deleteTask(task) {
            this.tasks = this.tasks.filter((t) => t.id !== task.id);
        },

        // Cambia el estado de la tarea entre completada y no completada
        toggleTaskCompletion(task) {
            task.completed = !task.completed;
        },
    },
};
</script>

<style scoped>

.add-task-container {
    padding: 40px; /* Aumentar padding */
    max-width: 600px; /* Aumentar ancho máximo */
    margin: 0 auto;
    text-align: center;
}

.title {
    font-size: 36px; /* Aumentar tamaño de fuente */
    margin-bottom: 30px;
    color: #343a40;
}

.input-group {
    display: flex;
    margin-bottom: 30px; /* Aumentar margen inferior */
}

.task-input {
    flex-grow: 1;
    padding: 15px; /* Aumentar padding */
    margin-right: 15px;
    border: 1px solid #ced4da;
    border-radius: 6px;
    font-size: 18px; /* Aumentar tamaño de texto */
}

.add-button {
    padding: 15px 20px; /* Aumentar padding */
    border: none;
    border-radius: 6px;
    background-color: #007bff;
    color: white;
    font-size: 18px; /* Aumentar tamaño de fuente */
    cursor: pointer;
}

.add-button:hover {
    background-color: #0056b3;
}

.task-list {
    margin-top: 30px;
}

.task-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #f8f9fa;
    padding: 20px; /* Aumentar padding */
    margin-bottom: 15px; /* Aumentar separación entre tareas */
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Aumentar sombra */
}

.completed {
    text-decoration: line-through;
    color: gray;
    font-size: 18px; /* Aumentar tamaño de fuente */
}

.task-actions {
    display: flex;
    gap: 15px; /* Aumentar separación entre botones */
}

.complete-button, .delete-button {
    padding: 12px; /* Aumentar tamaño de botones */
    border: none;
    border-radius: 8px;
    cursor: pointer;
}

.complete-button {
    background-color: transparent; /* Fondo transparente */
}

.delete-button {
    background-color: transparent; /* Fondo transparente */
}

.icon {
    width: 32px; /* Ajusta el tamaño del ícono según sea necesario */
    height: 32px; /* Ajusta el tamaño del ícono según sea necesario */
}
</style>
