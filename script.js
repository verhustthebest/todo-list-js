// Slect Element 
const input = document.getElementById("input_task")
const button = document.getElementById("Btn_add")
const list = document.getElementById("taskList")


// creation Array data 
let tasks = []

// Load tasks saved (LocalStorage)
let savedTasks = localStorage.getItem("tasks")

if (savedTasks){
    tasks = JSON.parse(savedTasks)
}


//Affichage tasks
function renderTasks(){

    list.innerHTML = "" //clearn list 

    tasks.forEach(function(task){

        const li = document.createElement("li")

        const span = document.createElement("span")
        span.textContent = task

        const deleteBtn = document.createElement("button")
        deleteBtn.textContent = "Supprimer"

        li.appendChild(span)
        li.appendChild(deleteBtn)

        list.appendChild(li)

        // supprimer tasks
        deleteBtn.addEventListener("click", function(){
            li.remove()
        })

        //Event : barrer tâche
        span.addEventListener("click", function(){
            span.classList.toggle("done")
        })
    })
}

//Function for View tasks during dowloand 
renderTasks()

//Added a new task
button.addEventListener("click", function(){

    const taskText = input.value

    if(taskText === "") return
    tasks.push(taskText)
//Persistance data of local
    localStorage.setItem("tasks", JSON.stringify(tasks))

    renderTasks()
    input.value = "" //Clear input after a new data

})