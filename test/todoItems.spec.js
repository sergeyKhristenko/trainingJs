describe('Add Todo', () => {
  // silly thing...
  let consoleSpy;

  beforeEach(() => {
    consoleSpy = spyOn(console, 'log').and.callThrough();
    clearTodoList();
  });

  it('add todo', () => {
    addTodoItem(todoItem);

    expect(todoItems.length).toEqual(1);
    expect(todoItems[0]).toEqual(todoItem);
    expect(consoleSpy).toHaveBeenCalledWith(todoItems);
  });

  it('add todo id0', () => {
    addTodoItem({ ...todoItem, id: 0 });

    expect(todoItems.length).toEqual(1);
    expect(todoItems[0]).toEqual({ ...todoItem, id: 0 });
  });

  it('todo not_completed by default', () => {
    addTodoItem({...todoItem, completed: true});

    expect(todoItems.length).toEqual(1);
    expect(todoItems[0].completed).toBe(false);
  }),

  it('add 2 todos', () => {
    const newTodo = { ...todoItem, id: 2 };

    addTodoItem(todoItem);
    addTodoItem(newTodo);

    expect(todoItems.length).toEqual(2);
    expect(todoItems[0]).toEqual(todoItem);
    expect(todoItems[1]).toEqual(newTodo);
  });

  it('check addTodoItem success flag', () => {
    const valid_todoItem = {
      text: 'text',
      completed: false,
      id: 1
    };
    const invalid_todoItem = {
      text: '',
      completed: false,
      id: 2
    };

    const success = addTodoItem(valid_todoItem);
    const fail = addTodoItem(invalid_todoItem);

    expect(success).toBe(true);
    expect(fail).toBe(false);
  });

  it('todo without text not added', () => {
    addTodoItem({ ...todoItem, text: '' });

    expect(todoItems).toEqual([]);
  });

  it('todo without any field not added', () => {
    const todoItem_NO_TEXT = {
      completed: false,
      id: 1
    };
    const todoItem_NO_COMPLETED = {
      text: 'text',
      id: 2
    };
    const todoItem_NO_ID = {
      text: 'text',
      completed: false
    };

    addTodoItem(todoItem_NO_TEXT);
    addTodoItem(todoItem_NO_COMPLETED);
    addTodoItem(todoItem_NO_ID);

    expect(todoItems.length).toEqual(0);
  });

  it('todo with not unique ID not added', () => {
    addTodoItem(todoItem);
    addTodoItem(todoItem);

    expect(todoItems.length).toEqual(1);
    expect(todoItems[0]).toEqual(todoItem);
  });
});

describe('View Todos', () => {
  let consoleSpy;

  beforeEach(() => {
    consoleSpy = spyOn(console, 'log').and.callThrough();
    clearTodoList();
  });

  it('"completed" - return only completed items', () => {
    addTodoItem(completed_todoItem);
    addTodoItem(notCompleted_todoItem);

    const filteredTodoList = viewTodoList('completed');

    expect(filteredTodoList.length).toEqual(1);
    expect(filteredTodoList[0]).toEqual(completed_todoItem);
    expect(consoleSpy).toHaveBeenCalledWith(todoItems);    
  });

  it('"not_completed" - return only NOT completed items', () => {
    addTodoItem(completed_todoItem);
    addTodoItem(notCompleted_todoItem);

    const filteredTodoList = viewTodoList('not_completed');

    expect(filteredTodoList.length).toEqual(1);
    expect(filteredTodoList[0]).toEqual(notCompleted_todoItem);
    expect(consoleSpy).toHaveBeenCalledWith(todoItems);    
  });

  it('"all" - return all items', () => {
    addTodoItem(completed_todoItem);
    addTodoItem(notCompleted_todoItem);

    const filteredTodoList = viewTodoList('all');

    expect(filteredTodoList.length).toEqual(2);
    expect(filteredTodoList).toEqual([completed_todoItem, notCompleted_todoItem]);
    expect(consoleSpy).toHaveBeenCalledWith(todoItems);  
  });

  it(`when flag wasn't regonized return false`, () => {
    addTodoItem(completed_todoItem);
    addTodoItem(notCompleted_todoItem);

    expect(viewTodoList('inrecognized')).toBe(false);
  });
});

describe('Edit Todos', () => {
  let consoleSpy;

  beforeEach(() => {
    consoleSpy = spyOn(console, 'log').and.callThrough();
    clearTodoList();
  });

  it('change text and success flag', () => {
    addTodoItem({ ...todoItem });

    expect(editTodoItem(1, 'newText')).toBe(true);
    expect(todoItems[0].text).toEqual('newText');
    expect(consoleSpy).toHaveBeenCalledWith(todoItems);    
  });

  it('if text arg was not specified - do nothing', () => {
    addTodoItem({ ...todoItem });

    expect(editTodoItem(1)).toBe(false);
    expect(todoItems[0].text).toEqual(todoItem.text);    
  });

  it('if no todo with such id - return false', () => {
    addTodoItem({ ...todoItem });

    expect(editTodoItem(100, 'newText')).toBe(false);
    expect(todoItems[0].text).toEqual(todoItem.text);
  });
});

describe('Delete Todos', () => {
 let consoleSpy;

  beforeEach(() => {
    consoleSpy = spyOn(console, 'log').and.callThrough();
    clearTodoList();
  });

  it('delete by id', () => {
    addTodoItem({ ...todoItem });
    addTodoItem({ ...todoItem, id: 2 });
    addTodoItem({ ...todoItem, id: 3 });

    deleteTodoItem(2);

    expect(todoItems).toEqual([todoItem, { ...todoItem, id: 3 }]);
    expect(consoleSpy).toHaveBeenCalledWith(todoItems);  
  });

  it('if no such id - return false', () => {
    addTodoItem({ ...todoItem });

    expect(deleteTodoItem(100)).toBe(false);
    expect(todoItems).toEqual([todoItem]);
  });
});

describe('Complete Todos', () => {
  let consoleSpy;

  beforeEach(() => {
    consoleSpy = spyOn(console, 'log').and.callThrough();
    clearTodoList();
  });

  it('completeTodo by id', () => {
    addTodoItem({ ...todoItem, completed: false });
    addTodoItem({ ...todoItem, completed: false, id: 2 });

    completeTodoItem(todoItem.id);

    expect(todoItems[0].completed).toBe(true);
    expect(todoItems[1].completed).toBe(false);
    expect(consoleSpy).toHaveBeenCalledWith(todoItems);  
  });

  it('if no todo with such id - return false', () => {
    addTodoItem({ ...todoItem, completed: false });

    expect(completeTodoItem(todoItem.id + 1)).toBe(false);
    expect(todoItems[0].completed).toBe(false);
  });
});

function clearTodoList() {
  todoItems = [];
}

function getAllTodoItems() {
  return todoItems;
}

const todoItem = Object.freeze({
  text: 'todoItem',
  completed: false,
  id: 1
});
const completed_todoItem = Object.freeze({
  text: 'completed_todoItem',
  completed: true,
  id: 1
});
const notCompleted_todoItem = Object.freeze({
  text: 'notCompleted_todoItem',
  completed: false,
  id: 2
});
