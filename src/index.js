document.addEventListener('DOMContentLoaded', () => {
  loadExisting()
    
  document.getElementById("button-create-list-form").addEventListener("click", createList)
    
  document.getElementById("lists").addEventListener("click", deleteList)

  document.getElementById("button-create-new-task").addEventListener("click", addTask)

});

function loadExisting() {
  fetch('http://localhost:3000/api/v1/lists')
    .then(function(resp) {return resp.json() })
    .then(function(json) {
      json.forEach(function(listDb) {
        timList(listDb)
        let loadList = new List(listDb.title, listDb.id)
    })
  }).then(() => {
  fetch('http://localhost:3000/api/v1/tasks')
    .then(function(resp) { return resp.json()})
    .then(function(json) {
      json.forEach(function(taskDb) {
        let desc = taskDb.description;
        let priority = taskDb.priority;
        let newTask = document.createElement('ul')
        newTask.innerHTML = `<li>Task: ${desc}<br>Priority: ${priority}</li>`
        document.getElementById(taskDb.list_id).appendChild(newTask)
        let loadTask = new Task(desc, priority, taskDb.list_id)
      })
    })
  })
}

function timList(newList) {
  let list = document.createElement('div')
  list.className = "list"
  list.id = `${newList.id}`
  document.getElementById("lists").appendChild(list)

  let deleteButton = document.createElement('button')
  deleteButton.className = "delete-list"
  deleteButton.innerText = "X"
  deleteButton.id = `button ${list.id}`
  document.getElementById(list.id).appendChild(deleteButton)

  let h = document.createElement("H2")
  h.innerText = newList.title
  document.getElementById(list.id).appendChild(h)

  let optionNew = document.createElement("option")
  optionNew.text = newList.title
  optionNew.id = `option ${list.id}`
  document.getElementById("parent-list").appendChild(optionNew) 
}

function createList(event) {
  event.preventDefault()
  
  let title = document.getElementById("new-list-title").value;

  fetch('http://localhost:3000/api/v1/lists', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({title: `${title}`})
  }).then((res) => {return res.json()}).then((list) => {
    new List(list.title, list.id)
    timList(list)
  })
}

function deleteList(event) {
  if (event.target.className === "delete-list")  {
    let targetId = event.target.id.slice(7)

    let listToDelete = document.getElementById(`${targetId}`)
    listToDelete.parentNode.removeChild(listToDelete)

    let optionToDelete = document.getElementById(`option ${targetId}`)
    optionToDelete.parentNode.removeChild(optionToDelete)

    let target = store.lists.find(function(el) {
        return el.id === targetId
    })

    let idx = store.lists.findIndex(function(el) {return el.id === 1
    })

    store.lists.splice(idx, 1)

    fetch(`http://localhost:3000/api/v1/lists/${targetId}`, {
      method: 'DELETE',
    })
  }
}

function addTask(event) {
  event.preventDefault()

  let desc = document.getElementById("new-task-description").value
  let priority = document.getElementById("new-task-priority").value

  let task = new Task(desc, priority);

  let newTask = document.createElement('ul')
  newTask.innerHTML = `<li>Task: ${desc}<br>Priority: ${priority}</li>`

  let listOwner = document.getElementById("parent-list").value

  let target = store.lists.find(function(el) {
      return el.title === listOwner
  })

  task.list_id = target.id;
  target.tasks.push(task)

  document.getElementById(`${target.id}`).appendChild(newTask)

  fetch('http://localhost:3000/api/v1/tasks', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({description: `${desc}`, priority: `${priority}`, list_id: `${task.list_id}`})
  })
}



