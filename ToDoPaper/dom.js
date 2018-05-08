function addTodoItemDom(todoItem) {
  const todoList = document.querySelector('#todo-items ul');
  const todoNode = new TodoTemplate(todoItem);

  todoList.appendChild(todoNode);
}

function viewTodoListDom(todoItemsArr) {
  const todoList = document.querySelector('#todo-items ul');

  // temp object to store nodes and use innerHtml later
  const middlewareNode = document.createElement('div');
  todoItemsArr.forEach(element => middlewareNode.appendChild(new TodoTemplate(element)));

  todoList.innerHTML = middlewareNode.innerHTML;
}

function editTodoItemDom(todoItemId, newText) {
  // edit only if todo is present in DOM
  // otherwise it will be shown after switching the filter
  const todoList = document.querySelector('#todo-items ul');

  if (todoList.contains(document.getElementById(`todoId-${todoItemId}`))) {
    document.querySelector(`#todoId-${todoItemId} span`).textContent = newText;
  }
}

function deleteTodoItemDom(todoItemId) {
  const todoList = document.querySelector('#todo-items ul');

  if (todoList.contains(document.getElementById(`todoId-${todoItemId}`))) {
    document.getElementById(`todoId-${todoItemId}`).remove();
  }
}

function initView() {
  viewTodoList('all');
}

function showTotalTodoCount() {
  const total = document.getElementById('totalTodos');
  total.textContent = `(${todoItems.length})`;
}

function TodoTemplate(todoItem) {
  const template = `<span style="display: inline-block; width: 350px;">${todoItem.text}</span>
                    <span>ID:${todoItem.id}</span>
                    <input type="checkbox" ${todoItem.completed ? 'checked' : ''}>`;

  const todo = document.createElement('li');
  todo.id = `todoId-${todoItem.id}`;
  todo.classList.add('todoItem'); // for testing purpose
  todo.innerHTML = template;

  return todo;
}
