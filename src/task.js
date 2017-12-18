/*
task is responsible for creating a single task object
*/
const Task = (() => {
  let id = 1
  return class Task {
    constructor(description, priority) {
      this.id = id++;
      this.description = description;
      this.priority = priority;
    }
  }

})()
