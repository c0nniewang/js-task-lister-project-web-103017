/*
list is responsible for creating a single list component
*/
const List = (() => {
  // let id = 1
  return class List {
    constructor(title, id) {
      this.id = id;
      this.title = title;
      this.tasks = [];
      store.lists.push(this);
    }

    static all() {
      return store.lists
    }
  }

})()
