let todoItems = [];

(function() {
  $.ajax({
    url: 'todos.json',
    async: false,
    success: function(data) {
      todoItems = JSON.parse(data).data;
    }
  });
})();
