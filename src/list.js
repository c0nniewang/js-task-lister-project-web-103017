/*
list is responsible for creating a single list component
*/
const List = (() => {
  let id = 1
  let all = []
  return class List {
    constructor(title) {
      this.id = id++;
      this.title = title;
      this.tasks = [];
      all.push(this)
    }

    static all() {
      return all
    }
  }

})()
