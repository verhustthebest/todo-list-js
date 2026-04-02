const input = document.getElementById("input_task");
const button = document.getElementById("Btn_add");
const list = document.getElementById("taskList");
const btnclearAll = document.getElementById("btnclearAll");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Fonction de l'Affichage
function renderTasks() {
    list.innerHTML = "";
    
    tasks.forEach(function(task, index) {
        const li = document.createElement("li");

        // Texte de la tâche
        const span = document.createElement("span");
        span.textContent = task.text;

        // Conteneur pour les boutons (pour un alignement parfait)
        const btnGroup = document.createElement("div");
        btnGroup.className = "btn-group";

        // Bouton Modifier
        const editBtn = document.createElement("button");
        editBtn.textContent = "Editer";
        //La connexion du bouton 'Editer' crée avec le CSS
        editBtn.classList.add("edit-btn"); 
        editBtn.className = "edit-btn";
        editBtn.onclick = function() {
            const newTaskText = prompt("Modifier la tâche :", task.text);
            if (newTaskText !== null && newTaskText.trim() !== "") {
                tasks[index].text = newTaskText.trim();
                saveTasks();
                renderTasks();
            }
        };

        // Bouton Supprimer
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Supprimer";
        //La connexion du bouton 'Supprimer' crée avec le CSS
        deleteBtn.classList.add("delete-btn");
        // deleteBtn.className = "delete-btn";
        
        deleteBtn.onclick = function() {
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        };

        // Assemblage
        btnGroup.prepend(editBtn);
        btnGroup.appendChild(deleteBtn);
        li.appendChild(span);
        // boutons Delet and Edit
        li.appendChild(btnGroup);
        //espace de Liste de tâche 
        list.appendChild(li); 
    });
}

// Ajouter une tâche
button.onclick = function() {
    const taskText = input.value.trim();
    if (taskText === "") return;
//utiliastion du méthode ".unshift()" pour afficher les tâches recentes d'un manière crosisante
    tasks.unshift({ text: taskText, completed: false });
    saveTasks();
    renderTasks();
    input.value = "";
    input.focus();
}; 

// Vider tout
btnclearAll.onclick = function() {
    if (tasks.length > 0 && confirm("Tout supprimer ?")) {
        tasks = [];
        saveTasks();
        renderTasks();
    }
};

renderTasks();