const DEFAULT_FILTER_VALUE = 'all';
let currentFilterValue = DEFAULT_FILTER_VALUE;

function addTodoItem(todoItem) {
  // check for required fields
  if (todoItem.id === undefined || todoItem.completed === undefined || !todoItem.text) {
    return false;
  }

  // check is item id is unique
  if (todoItems.some(item => item.id === todoItem.id)) {
    return false;
  }

  // default value should be false
  todoItem.completed = false;
  todoItems.push(todoItem);
  showTotalTodoCount();

  if (currentFilterValue === 'completed') {
    // todoItem is not_completed by default
    // so there is not much sense to show it in this case
    console.log(todoItems);

    return true;
  }

  addTodoItemDom(todoItem);
  console.log(todoItems);

  return true;
}

function viewTodoList(itemsType) {
  // 'completed' 'not_completed' 'all'
  let filteredArray = [];

  switch (itemsType) {
    case 'completed':
      filteredArray = todoItems.filter(item => item.completed);
      currentFilterValue = 'completed';
      viewTodoListDom(filteredArray);

      return filteredArray;
    case 'not_completed':
      filteredArray = todoItems.filter(item => !item.completed);
      currentFilterValue = 'not_completed';
      viewTodoListDom(filteredArray);

      return filteredArray;
    case 'all':
      filteredArray = [...todoItems]; // to avoid mutability issues
      currentFilterValue = 'all';
      viewTodoListDom(filteredArray);

      return filteredArray;
    default:
      return false;
  }
}

function editTodoItem(todoItemId, newText) {
  if (!newText) {
    return false;
  }

  const ind = todoItems.findIndex(todo => todo.id === todoItemId);

  if (ind !== -1) {
    todoItems[ind].text = newText;

    editTodoItemDom(todoItems[ind].id, newText);

    console.log(todoItems);
    return true;
  }

  return false;
}

function deleteTodoItem(todoItemId) {
  const ind = todoItems.findIndex(todo => todo.id === todoItemId);

  if (ind !== -1) {
    deleteTodoItemDom(todoItems[ind].id);
    todoItems.splice(ind, 1);
    showTotalTodoCount();

    console.log(todoItems);
    return true;
  }

  return false;
}

function completeTodoItem(todoItemId) {
  const ind = todoItems.findIndex(todo => todo.id === todoItemId);

  if (ind !== -1) {
    todoItems[ind].completed = true;
    
    console.log(todoItems);
    return true;
  }

  return false;
}
