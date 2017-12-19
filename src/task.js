/*
task is responsible for creating a single task object
*/

store = {tasks: [], lists:[]}

const Task = (() => {
  let id = 1
  return class Task {
    constructor(description, priority, list_id) {
      this.id = id++;
      this.description = description;
      this.priority = priority;
      if (list_id) {
        this.list_id = parseInt(list_id)
      }
      store.tasks.push(this);
    }
  }

})()
