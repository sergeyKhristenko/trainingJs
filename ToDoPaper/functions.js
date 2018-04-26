var todoItems = [];

function addTodoItem(todoItem) {
  const isIdUnique = todoItems.filter(item => item.id === todoItem.id).length === 0;

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
      return;
  }
}

function editTodoItem(todoItemId, newText) {
  if (!newText) {
    return false;
  }

  todoItems.forEach(item => {
    if (item.id === todoItemId) {
      item.text = newText;

      return true;
    } else {
      return false;
    }
  });
}

var todoItem = {
  text: ' ',
  completed: true,
  id: 2
};

var todoItem2 = {
  text: ' ',
  completed: false,
  id: 1
};

// addTodoItem(todoItem);
console.log(addTodoItem(todoItem));
console.log(addTodoItem(todoItem2));

console.log(viewTodoList('all'));
console.log(editTodoItem(2, 'newText'));
console.log(todoItems);
