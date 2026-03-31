// SÉLECTION DES ÉLÉMENTS
const input = document.getElementById("input_task");
const button = document.getElementById("Btn_add");
const list = document.getElementById("taskList");
const btnclearAll = document.getElementById("btnclearAll");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
    list.innerHTML = "";
    
    tasks.forEach(function(task, index) {
        const li = document.createElement("li");

        // CORRECTION : Création du span pour le texte
        const span = document.createElement("span");
        span.textContent = task.text;

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Supprimer";
        
        deleteBtn.addEventListener("click", function() {
            tasks.splice(index, 1);
            saveTasks(); // On sauvegarde après suppression
            renderTasks(); // On rafraîchit la liste
            input.focus();
        });

        li.appendChild(span);
        li.appendChild(deleteBtn);
        list.appendChild(li);
    });
}

// AJOUT D’UNE TÂCHE
button.addEventListener("click", function() {
    const taskText = input.value.trim();
    if (taskText === "") {
        alert("Veuillez écrire une tâche s'il vous plaît..");
        input.focus()
        return;
    }
    tasks.push({
        text: taskText, completed: false
    });
    
    //Update & stockage
    saveTasks();
    renderTasks();
    
    input.value = "";
    input.focus();
});

// VIDER TOUT
btnclearAll.onclick = function() {
    if (confirm("Voulez-vous tout supprimer ?")) {
        tasks = [];
        saveTasks();
        renderTasks();
        input.focus();
    }
};

// INITIALISATION (Au chargement de la page)
renderTasks();