import { getTasks, saveTask, onGetTasks, deleteTask, getTask, updateTask } from "./conection.js";

const taskContainer = document.getElementById("tasks-container");

let editStatus = false;
let id = "";


window.addEventListener("DOMContentLoaded", async () => {
	onGetTasks((tareas) => {

	let html = ""

	tareas.forEach(tarea => {
		const tasks = tarea.data()
		html += `
			<div>
				<h1 class="m-2 font-bold">Titulo: ${tasks.title}</h1>
				<p class="m-2 ">Descripcion: ${tasks.description}</p>
				<button class="btn-delete bg-red-700 hover:bg-red-600 rounded-lg p-2 m-2" 
					data-id="${tarea.id}" >Eliminar</button>
				<button class="btn-edit bg-blue-700 hover:bg-blue-600 rounded-lg p-2 m-2" 
					data-id="${tarea.id}" >Editar</button>
			</div>
		`
	})
	taskContainer.innerHTML = html
	const btnsdelete = taskContainer.querySelectorAll(".btn-delete")
	btnsdelete.forEach(btn => {
		btn.addEventListener("click", async (e) => {
			await deleteTask(e.target.dataset.id)
		})
	})

	const btnsEdit = taskContainer.querySelectorAll(".btn-edit")
	btnsEdit.forEach(btn => {
		btn.addEventListener("click", async (e) => {
		try {
			const doc = await getTask(e.target.dataset.id)
			const tassk = doc.data()	
			taskForm["task-title"].value = tassk.title
			taskForm["task-description"].value = tassk.description
			
			editStatus = true;
			id = doc.id;
			taskForm["task-save"].innerText = "Editar"
		} catch (error) {
			console.log(error);
		}

		})
	})



	})
})

const taskForm = document.getElementById("task-form");

taskForm.addEventListener("submit",async (e) => {
	e.preventDefault()
	// console.log("Submit");
	const title = taskForm["task-title"]
	const description = taskForm["task-description"]

	try {
    if (!editStatus) {
      await saveTask(title.value, description.value);
    } else {
      await updateTask(id, {
        title: title.value,
        description: description.value,
      });

      editStatus = false;
      id = "";
      taskForm["task-save"].innerText = "Save";
    }

    taskForm.reset();
    title.focus();
  } catch (error) {
    console.log(error);
  }
})