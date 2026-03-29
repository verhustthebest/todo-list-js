// SÉLECTION DES ÉLÉMENTS

const input = document.getElementById("input_task")
const button = document.getElementById("Btn_add")
const list = document.getElementById("taskList")
 

// TABLEAU DES TÂCHES:  tâche devient un objet
let tasks = JSON.parse(localStorage.getItem("tasks")) || []

//  SAUVEGARDE LOCALSTORAGE
 
function saveTasks(){
localStorage.setItem("tasks", JSON.stringify(tasks))
}

// AFFICHAGE DES TÂCHES

 function renderTasks(){

list.innerHTML = ""

tasks.forEach(function(task, index){

const li = document.createElement("li")

const span = document.createElement("span")
span.textContent = task.text

// appliquer style si terminé
if(task.completed){
span.classList.add("completed")
}

// bouton supprimer
const deleteBtn = document.createElement("button")
deleteBtn.textContent = "Supprimer"

// EVENT SUPPRIMER
deleteBtn.addEventListener("click", function(){

// supprimer du tableau
tasks.splice(index, 1)

// sauvegarder
saveTasks()

// re-render
renderTasks()

})

// EVENT COMPLETED
span.addEventListener("click", function(){

// inverser état
task.completed = !task.completed

// sauvegarder
saveTasks()

// re-render
renderTasks()

})

// assemblage
li.appendChild(span)
li.appendChild(deleteBtn)

list.appendChild(li)

})

}

// AJOUT D’UNE TÂCHE 

button.addEventListener("click", function(){

const taskText = input.value.trim()

if(taskText === "") return

// ajouter objet (PRO)
tasks.push({
text: taskText,
completed: false
})

saveTasks()
renderTasks()

input.value = ""
input.focus() // UX 🔥

})

// ==========================
// INITIALISATION
// ==========================
renderTasks()