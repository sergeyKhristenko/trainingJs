function Machine(power) {
  this._power = power;
  this._enabled = false;
  var self = this;
  this.enable = function() {
    self._enabled = true;
  };
  this.disable = function() {
    self._enabled = false;
  };
}

function Fridge(power = 100) {
  Machine.call(this, power);

  let food = [];
  const maxFoodQuantity = this._power / 100;

  this.addFood = function(item) {
    if (!this._enabled) {
      throw new Error('Enable the fridge first!');
    }

    const args = [...arguments];
    const foodToAdd = [...food, ...args];

    if (foodToAdd.length > maxFoodQuantity) {
      throw new Error('There is too match food in the fridge!');
    }

    food = foodToAdd;
  };

  this.getFood = function(item) {
    // assuming the food is a flat array
    return [...food];
  };
}
