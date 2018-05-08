describe('Integrational tests', () => {
  beforeEach(() => {
    document.body.innerHTML = __html__['ToDoPaper/index.html'];
    // clear todoList
    todoItems = [];
    currentFilterValue = DEFAULT_FILTER_VALUE;
  });

  it('add todo', () => {
    const todo = new TodoItem();
    addTodoItem(todo);

    const addedTodo = document.getElementById(`todoId-${todo.id}`);
    const addedTodoText = addedTodo.querySelector('span');
    const addedTodoId = addedTodo.querySelectorAll('span')[1];
    const addedTodoCompleted = addedTodo.querySelector('input');
    expect(addedTodoText.textContent).to.equal(todo.text);
    expect(addedTodoId.textContent).to.equal(`ID:${todo.id}`);
    expect(addedTodoCompleted.hasAttribute('checked')).to.equal(todo.completed);
  });

  it('add few todos', () => {
    [...Array(20).keys()].forEach(num => addTodoItem(new TodoItem().withId(num)));
    expect(document.querySelectorAll('.todoItem').length).to.equal(20, 'Add 20 todoItem');
  });

  it('edit todo item', () => {
    addTodoItem(new TodoItem());
    addTodoItem(new TodoItem().withId(2));

    editTodoItem(2, 'new text');

    expect(document.querySelector(`#todoId-${2} > span`).textContent).to.equal('new text');
  });

  it('delete todo item', () => {
    addTodoItem(new TodoItem().withId(2));

    deleteTodoItem(2);

    expect(document.querySelectorAll(`.todoItem`).length).to.equal(0);
  });

  it('view todo list', () => {
    addTodoItem(new TodoItem().withId(2));
    addTodoItem(new TodoItem().withId(3));

    viewTodoList('not_completed');
    expect(document.querySelectorAll('.todoItem').length).to.equal(2);

    viewTodoList('completed');
    expect(document.querySelectorAll('.todoItem').length).to.equal(0);

    viewTodoList('all');
    expect(document.querySelectorAll('.todoItem').length).to.equal(2);
  });

  it('complete todo and check viewTodoList', () => {
    addTodoItem(new TodoItem().withId(2));
    addTodoItem(new TodoItem().withId(3));

    completeTodoItem(2);

    viewTodoList('not_completed');
    expect(document.querySelectorAll('.todoItem').length).to.equal(1);

    viewTodoList('completed');
    expect(document.querySelectorAll('.todoItem').length).to.equal(1);

    viewTodoList('all');
    expect(document.querySelectorAll('.todoItem').length).to.equal(2);
  });

  it('chosen filter should not get lost when add new todo', () => {
    addTodoItem(new TodoItem().withId(2));
    completeTodoItem(2);

    viewTodoList('completed');
    expect(document.querySelectorAll('.todoItem').length).to.equal(1);

    addTodoItem(new TodoItem().withId(3));
    expect(document.querySelectorAll('.todoItem').length).to.equal(1);

    deleteTodoItem(new TodoItem().withId(3));
    expect(document.querySelectorAll('.todoItem').length).to.equal(1);
  });

  describe('Show total todo count tests', () => {
    const getTotalTodoCount = () => Number((document.getElementById('totalTodos').textContent).replace(/\D/g, ''));
    let todoCountBefore;
    const defaultTodoID = 1;

    beforeEach(() => {
      addTodoItem(new TodoItem().withId(defaultTodoID));
      todoCountBefore = getTotalTodoCount();
    });

    it('total count incremented after adding todo', () => {
      addTodoItem(new TodoItem().withId(2));
  
      expect(getTotalTodoCount()).to.equal(todoCountBefore+1);
    });
  
    it('total count decremented after deleting todo', () => {
      deleteTodoItem(defaultTodoID);
  
      expect(getTotalTodoCount()).to.equal(todoCountBefore-1);
    });

    it('total count not changed on edit todo', () => {
      editTodoItem(defaultTodoID, 'New Text');
  
      expect(getTotalTodoCount()).to.equal(todoCountBefore);
    });

    it('total count not changed after complete todo', () => {
      completeTodoItem(defaultTodoID);
  
      expect(getTotalTodoCount()).to.equal(todoCountBefore);
    });

    it('total count not changed after changing filter', () => {
      viewTodoList('completed');

      expect(getTotalTodoCount()).to.equal(todoCountBefore);
    });
  });

});
