let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");
let taskBox = document.querySelector(".task");

window.addEventListener("load", Swal.fire("Free Palestine ❤️!"));

let taskArray = [];
// Add task

if (localStorage.getItem("tasks")) {
  taskArray = JSON.parse(localStorage.getItem("tasks"));
}
getFromLocal();

submit.onclick = function () {
  if (input.value !== "") {
    addTask(input.value);
    input.value = "";
  } else {
    Swal.fire("!بتستظرف ؟", "أكتب التاسك ي متخاذل", "info");
  }
};

tasksDiv.addEventListener("click", (e) => {
  if (e.target.classList.contains("del")) {
    deletFromLocal(e.target.parentElement.getAttribute("data-id"));
    e.target.parentElement.remove();
  }

  if (e.target.classList.contains("sp-done")) {
    toggleStatus(e.target.parentElement.getAttribute("data-id"));
    e.target.parentElement.classList.toggle("done");
    Swal.fire("Good job!", "Your task Done!", "success");
  }
});

function addTask(taskText) {
  const task = {
    id: Date.now(),
    title: taskText,
    completed: false,
  };

  taskArray.push(task);

  addElement(taskArray);

  addToLocal(taskArray);
}

function addElement(taskOfArray) {
  tasksDiv.innerHTML = "";

  taskOfArray.forEach((task) => {
    let div = document.createElement("div");
    div.className = "task";

    if (task.completed) {
      div.className = "task done";
    }

    div.setAttribute("data-id", task.id);
    div.appendChild(document.createTextNode(task.title));

    let span = document.createElement("span");
    span.className = "del";

    span.appendChild(document.createTextNode("Delete"));

    div.appendChild(span);

    let spanDone = document.createElement("span");
    spanDone.className = "sp-done";
    spanDone.setAttribute("data-id", task.id);

    spanDone.appendChild(document.createTextNode("Done"));

    div.appendChild(spanDone);

    tasksDiv.appendChild(div);
  });
}

function addToLocal(taskArray) {
  window.localStorage.setItem("tasks", JSON.stringify(taskArray));
}

function getFromLocal() {
  let data = window.localStorage.getItem("tasks");
  if (data) {
    let tasks = JSON.parse(data);
    addElement(tasks);
  }
}

function deletFromLocal(taskId) {
  taskArray = taskArray.filter((task) => task.id != taskId);
  addToLocal(taskArray);
}

function toggleStatus(taskId) {
  for (let i = 0; i < taskArray.length; i++) {
    if (taskArray[i].id == taskId) {
      taskArray[i].completed == false
        ? (taskArray[i].completed = true)
        : (taskArray[i].completed = false);
    }
  }
  addToLocal(taskArray);
}
