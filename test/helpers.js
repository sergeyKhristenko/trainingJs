class TodoItem {
  constructor() {
    this.text = 'Default todo text';
    this.id = 1;
    this.completed = false;
  }

  withText(text) {
    this.test = text;
    return this;
  }
  withId(id) {
    this.id = id;
    return this;
  }
  withCompleted(bool) {
    this.completed = bool;
    return this;
  }
}
