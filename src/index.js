document.addEventListener('DOMContentLoaded', () => {
  document.getElementById("button-create-list-form").addEventListener("click", createList)

  function createList(event) {
    event.preventDefault()
    let title = document.getElementById("new-list-title").value;

    let newList = new List(title);

    let list = document.createElement('div')
    list.className = "list"
    list.id = `${newList.id}`
    document.getElementById("lists").appendChild(list)

    let deleteButton = document.createElement('button')
    deleteButton.className = "delete-list"
    deleteButton.innerText = "X"
    deleteButton.id = `${list.id} button`
    document.getElementById(list.id).appendChild(deleteButton)

    let h = document.createElement("H2")
    h.innerText = title
    document.getElementById(list.id).appendChild(h)

    let optionNew = document.createElement("option")
    optionNew.text = title
    optionNew.id = `${list.id} option`
    document.getElementById("parent-list").appendChild(optionNew)

    }

    document.getElementById("lists").addEventListener("click", deleteList)

    function deleteList(event) {
      if (event.target.className === "delete-list")  {
        let targetId = event.target.id[0]

        let listToDelete = document.getElementById(`${targetId}`)
        listToDelete.parentNode.removeChild(listToDelete)

        let optionToDelete = document.getElementById(`${targetId} option`)
        optionToDelete.parentNode.removeChild(optionToDelete)

        let target = List.all().find(function(el) {
            return el.id === targetId
        })

        let idx = List.all().findIndex(function(el) {return el.id === 1
        })

        List.all().splice(idx, 1)
      }
    }

document.getElementById("button-create-new-task").addEventListener("click", addTask)

  function addTask(event) {
    event.preventDefault()

    let desc = document.getElementById("new-task-description").value
    let priority = document.getElementById("new-task-priority").value

    let task = new Task(desc, priority);

    let newTask = document.createElement('ul')
    newTask.innerHTML = `<li>Task: ${desc}<br>Priority: ${priority}</li>`

    let listOwner = document.getElementById("parent-list").value

    let target = List.all().find(function(el) {
        return el.title === listOwner
    })

    target.tasks.push(task)

    document.getElementById(`${target.id}`).appendChild(newTask)
  }

});
