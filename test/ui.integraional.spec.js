describe('UI tests', () => {
  beforeEach(() => {
    document.body.innerHTML = __html__['ToDoPaper/index.html'];
    // clear todoList
    todoItems = [];
    currentFilterValue = DEFAULT_FILTER_VALUE;
    initView();
  });

  it('add todo by click on Add button', () => {
    $('.todoInput').value = 'new text';
    $('.addTodo').click();

    expect($$('.todoItem').length).to.equal(1);
    expect($('.todoItem span').textContent).to.equal('new text');    
    expect(todoItems.length).to.equal(1);
  });

  it('add todo by hitting Enter', () => {
    $('.todoInput').value = 'new text';
    $('.todoInput').hitEnter();

    expect($$('.todoItem').length).to.equal(1);
    expect($('.todoItem span').textContent).to.equal('new text');
    expect(todoItems.length).to.equal(1);
  });

  it('edit todo on focusOut', () => {
    const textAfterEdit = 'Another Edited text';
    addTodoItem(new TodoItem());

    $('[name="editBtn"]').click();
    $('input[name="editTodo"]').value = textAfterEdit;
    $('input[name="editTodo"]').dispatchEvent(new Event('focusout'));

    expect($('.todoItem span').textContent).to.equal(textAfterEdit);
    expect(todoItems[0].text).to.equal(textAfterEdit);
  });

  it('edit todo by clicking Enter', () => {
    const textAfterEdit = 'Another Edited text';
    addTodoItem(new TodoItem());

    $('[name="editBtn"]').click();
    $('input[name="editTodo"]').value = textAfterEdit;
    $('[name="editTodo"]').hitEnter();

    expect($('.todoItem span').textContent).to.equal(textAfterEdit);
    expect(todoItems[0].text).to.equal(textAfterEdit);
  });

  it('complete todo by click on checkbox', () => {
    addTodoItem(new TodoItem().withId(2));

    $('[name="completedTodo"]').click();

    expect($('.todoItem input[name="completedTodo"]').checked).to.be.true;
    expect(todoItems.find(item => item.id === 2).completed).to.be.true;
  });

  it('user unable to "uncomplete" todo', () => {
    addTodoItem(new TodoItem().withId(2));

    $('[name="completedTodo"]').click();
    // click on checkbox again has no effect
    $('[name="completedTodo"]').click();

    expect($('.todoItem input[name="completedTodo"]').checked).to.be.true;
    expect(todoItems.find(item => item.id === 2).completed).to.be.true;
  });

  it('delete todo', () => {
    addTodoItem(new TodoItem().withId(2));

    $('.todoItem button[name="deleteBtn"]').click();

    expect($$('.todoItem').length).to.equal(0);
    expect(todoItems.length).to.equal(0);
  });
});

function $(selector) {
return document.querySelector(selector);
}

function $$(selector) {
return document.querySelectorAll(selector);
}

HTMLElement.prototype.click = function() {
this.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
};

HTMLElement.prototype.hitEnter = function() {
this.dispatchEvent(new KeyboardEvent('keyup', { code: 'Enter' }));
};
