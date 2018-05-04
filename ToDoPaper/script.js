let todoItems = [];

(function() {
  $.getJSON('todos.json', function(data) {
    todoItems = data.data;
  });
})();
