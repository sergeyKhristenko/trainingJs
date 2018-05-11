describe('dom.js tests', () => {
  const template = `<div id="todo-items" style="width: 500px; margin:auto">
    <H3 style="text-align: center">TODOS <span id="totalTodos"></span></H3>
    <ul></ul>
    </div>`;

  beforeEach(() => {
    document.body.innerHTML = template;

    // clear todoList
    todoItems = [];
  });

  it('add todo', () => {
    addTodoItemDom(new TodoItem());

    expect(document.querySelectorAll('.todoItem').length).to.equal(1);
  });

  it('view todo list', () => {
    todoItems.push(new TodoItem());
    todoItems.push(new TodoItem().withId(2));

    viewTodoListDom([...todoItems]);

    expect(document.querySelectorAll('.todoItem').length).to.equal(2);
  });

  it('edit todo', () => {
    const todoID = 4;
    const newText = 'new text';
    const todoTemplate = `<li id="todoId-${todoID}" class="todoItem">
    <span style="display: inline-block; width: 350px;">text</span>
    <span>ID:${todoID}</span>
    <input type="checkbox"></li>`;
    document.querySelector('#todo-items ul').innerHTML = todoTemplate;

    editTodoItemDom(todoID, newText);

    expect(document.querySelector(`#todoId-${todoID} span`).textContent).to.equal(newText);
  });

  it('delete todo', () => {
    const todo_ID = 2;
    const todoTemplate1 = todoTemplateMock(todo_ID);
    const todoTemplate2 = todoTemplateMock(todo_ID+1);
    document.querySelector('#todo-items ul').innerHTML = todoTemplate1+todoTemplate2;

    console.log(document.querySelector('#todo-items ul'));
    deleteTodoItemDom(todo_ID);

    const todoItemsList = document.querySelectorAll('.todoItem');
    expect(todoItemsList.length).to.equal(1);
    expect(todoItemsList[0].querySelectorAll('span')[1].textContent).to.equal(`ID:${todo_ID+1}`);
  });

  it('show total count', () => {
    showTotalTodoCount();
    expect(document.getElementById('totalTodos').textContent).to.equal('(0)');
    
    todoItems.push(new TodoItem());
    showTotalTodoCount();    
    expect(document.getElementById('totalTodos').textContent).to.equal('(1)');
  })
});

function todoTemplateMock(todoId = 1) {
  return `<li id="todoId-${todoId}" class="todoItem">
  <span style="display: inline-block; width: 350px;">text</span>
  <span>ID:${todoId}</span>
  <input type="checkbox"></li>`;
} 