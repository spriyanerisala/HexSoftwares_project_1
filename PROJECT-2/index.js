const taskInput=document.getElementById("task")
const taskList =document.getElementById("todo_list")

document.addEventListener("DOMContentLoaded",loadTasks)

function addTask(){
const taskText = taskInput.value.trim()
if(taskText === ""){
    alert("Please enter a task ! ")
    return;
}

const task={
    text:taskText,
    completed:false
}

saveTask(task)

renderTask(task)
taskInput.value=""

}

function renderTask(task){
    const li =document.createElement("li")
    if(task.completed){
        li.classList.add("completed task")
    }

    li.innerHTML=`<span onClick = "toggleCompleteTask(this)">${task.text}</span>
    <button onClick="deleteTask(this)">X</button>`
    taskList.appendChild(li)
}

function toggleComplete(span) {
  const li = span.parentElement;
  li.classList.toggle("completed");
  updateStorage();
}

function deleteTask(button) {
  const li = button.parentElement;
  li.remove();
  updateStorage();
}

function saveTask(task) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
function updateStorage() {
  const tasks = [];
  document.querySelectorAll("#taskList li").forEach(li => {
    tasks.push({
      text: li.querySelector("span").innerText,
      completed: li.classList.contains("completed")
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => renderTask(task));
}

