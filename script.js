const input = document.getElementById("input_task");
const button = document.getElementById("Btn_add");
const list = document.getElementById("taskList");
const btnclearAll = document.getElementById("btnclearAll");
const rech = document.getElementById("Input_rech"); // Barre - Recherche
const No_view = document.getElementById("noview") //Si tâche non trouvée

//Fonction recherche
rech.addEventListener('input', (e) =>{
    const rech = e.target.value.toLowerCase().trim();
    const tasks = document.querySelectorAll('.task-item');
    // Par défaut, Rien trouvé
    let flag = false; 

    tasks.forEach(task => {
        const taskText = task.querySelector('.task-text').textContent.toLowerCase();

        if (taskText.includes(rech)) {
            task.style.display = 'flex';
            //
            flag = true; // On a trouvé........
        } else {
            task.style.display = 'none';
        }
    });

    //si aucune tâche trouvée
    if (!flag && rech !== "") {
        noview.style.display = 'block'; // On montre le message
    } else {
        noview.style.display = 'none';  // On le cache
    }
});


// Les données
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Fonction de l'Affichage
function renderTasks() {
    list.innerHTML = "";
    
    tasks.forEach(function(task, index) {
        const li = document.createElement("li"); 
/*Classe "task-item" pour pouvoir manipuler l'élément via CSS 
 et le retrouver facilement avec querySelectorAll dans la barre de recherche.*/
li.classList.add("task-item");

        ////Elément contenant le texte de la tâche
        const span = document.createElement("span");
        // ajout de cette classe pour sélecteur de la recherche
        span.classList.add("task-text");
        span.textContent = task.text; //Contenu du texte récupéré depuis l'object task 

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
        //La connexion du bouton 'Supprimer' crée avec le CSS
        deleteBtn.textContent = "Supprimer";
        // deleteBtn.className = "delete-btn";
        deleteBtn.classList.add("delete-btn");
        
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