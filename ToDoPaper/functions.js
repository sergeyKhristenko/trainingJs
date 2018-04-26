var todoItems = [];

function addTodoItem(todoItem) {
  const isIdUnique = todoItem.id && todoItems.filter(item => item.id === todoItem.id).length === 0;

  if (todoItem.text && todoItem.hasOwnProperty('completed') && isIdUnique) {
    todoItems.push(todoItem);

    return true;
  }

  return false;
}

function viewTodoList(itemsType) {
  // 'completed' 'not_completed' 'all'
  switch (itemsType) {
    case 'completed':
      return todoItems.filter(item => item.completed);
      break;
    case 'not_completed':
      return todoItems.filter(item => !item.completed);
      break;
    case 'all':
      return todoItems;
      break;
    default:
      return false;
  }
}

function editTodoItem(todoItemId, newText) {
  if (!newText) {
    return false;
  }

  const ind = todoItems.findIndex(todo => todo.id === todoItemId);
  if(ind !== -1) {
    todoItems[ind].text = newText;

    return true;
  }

  return false;
}

function deleteTodoItem(todoItemId) {
  const ind = todoItems.findIndex(todo => todo.id === todoItemId);

  if(ind !== -1) {
    todoItems.splice(ind, 1);

    return true;
  }

  return false;
}

function completeTodoItem(todoItemId) {
  const ind = todoItems.findIndex(todo => todo.id === todoItemId);

  if(ind !== -1) {
    todoItems[ind].completed = true;

    return true;
  }

  return false;
}

// var todoItem = {
//   text: ' ',
//   completed: true,
//   // id: 2
// };

// var todoItem2 = {
//   text: ' ',
//   completed: false,
//   id: 1
// };

// addTodoItem(todoItem);
// console.log(addTodoItem(todoItem));
// console.log(addTodoItem(todoItem2));

// console.log(viewTodoList('all'));
// console.log(editTodoItem(2, 'newText'));
// console.log('!!!!',todoItems);
