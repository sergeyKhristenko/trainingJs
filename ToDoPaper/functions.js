function addTodoItem(todoItem) {
  // check for required fields
  if(todoItem.id === undefined || todoItem.completed === undefined || !todoItem.text) {
    return false;
  }

  // check is item id is unique
  if(todoItems.some(item => item.id === todoItem.id)) {
    return false;
  }

  // default value should be false
  todoItem.completed = false;
  todoItems.push(todoItem);
  
  console.log(todoItems);
  return true;
}

function viewTodoList(itemsType) {
  // 'completed' 'not_completed' 'all'
  switch (itemsType) {
    case 'completed':
      return todoItems.filter(item => item.completed);
    case 'not_completed':
      return todoItems.filter(item => !item.completed);
    case 'all':
      return [...todoItems]; // to avoid mutability issues
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

    console.log(todoItems);
    return true;
  }

  return false;
}

function deleteTodoItem(todoItemId) {
  const ind = todoItems.findIndex(todo => todo.id === todoItemId);

  if(ind !== -1) {
    todoItems.splice(ind, 1);

    console.log(todoItems);
    return true;
  }

  return false;
}

function completeTodoItem(todoItemId) {
  const ind = todoItems.findIndex(todo => todo.id === todoItemId);

  if(ind !== -1) {
    todoItems[ind].completed = true;

    console.log(todoItems);
    return true;
  }

  return false;
}
