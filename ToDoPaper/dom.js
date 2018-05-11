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
  // set default sorting 
  const buttons = [...document.querySelectorAll('[name="viewTodoList"]')];
  const activeFilter = buttons.find(button => button.checked);

  viewTodoList(activeFilter.value);

  document.getElementById('addTodo').addEventListener('click', submitTodo);
  document.getElementById('newTodoText').addEventListener('keyup', submitTodo);

  function submitTodo(event) {
    if (event.code === 'Enter' || event.type === 'click') {
      const input = document.getElementById('newTodoText');
      // increment max id from todoList or set 1 as initial
      const newId = Math.max(...todoItems.map(item => item.id), 0) + 1;

      addTodoItem({ text: input.value, completed: false, id: newId });
      input.value = '';
    }
  }

  document.getElementById('todo-items').addEventListener('click', function(event) {
    if (event.target.name === 'completedTodo') {
      const id = Number(event.target.parentElement.id.replace(/\D/g, ''));

      // forbid "uncomplete" todos
      if(todoItems.find(todo => todo.id === id).completed === true) {
        event.preventDefault();
        
        return;
      }

      completeTodoItem(Number(id));
      event.target.checked = true;
    }
  });

  document.getElementById('todo-items').addEventListener('click', function(event) {
    if (event.target.name === 'deleteBtn') {
      const id = Number(event.target.parentElement.id.replace(/\D/g, ''));
      deleteTodoItem(id);
    }
  });

  document.getElementById('todo-items').addEventListener('click', function(event) {
    if (event.target.name === 'editBtn') {
      // reveal the input on click 'edit' btn, get the value and pass it back to span
      // this entire function looks clunky but I don't know yet how to make pretty...
      const prevValue = event.target.parentElement.querySelector('span');
      const el = event.target.parentElement.querySelector('input[name="editTodo"]');
      el.setAttribute('style', 'display: inline-block; width: 296px');
      el.value = prevValue.textContent;
      prevValue.setAttribute('style', 'display:none');
      el.focus();

      el.addEventListener('focusout', editTodo);
      el.addEventListener('keyup', editTodo);

      function editTodo(event) {
        if (event.code === 'Enter' || event.type === 'focusout') {
          const id = Number(event.target.parentElement.id.replace(/\D/g, ''));
          editTodoItem(id, event.target.value);
          el.setAttribute('style', 'display: none');
          prevValue.setAttribute('style', 'display: inline-block; width: 300px;');

          el.removeEventListener('focusout', editTodo);
          el.removeEventListener('keyup', editTodo);
        }
      }
    }
  });
}

function showTotalTodoCount() {
  const total = document.getElementById('totalTodos');
  total.textContent = `(${todoItems.length})`;
}

function TodoTemplate(todoItem) {
  const template = `<span style="display: inline-block; width: 300px;">${todoItem.text}</span>
                    <input type="text" name="editTodo" style="display:none" width: 300px>
                    <span>ID:${todoItem.id}</span>
                    <input type="checkbox" name="completedTodo" ${todoItem.completed ? 'checked' : ''}>
                    <button name="editBtn">Edit</button>
                    <button name="deleteBtn">Delete</button>
                    `;

  const todo = document.createElement('li');
  todo.id = `todoId-${todoItem.id}`;
  todo.classList.add('todoItem'); // for testing purpose
  todo.innerHTML = template;

  return todo;
}
