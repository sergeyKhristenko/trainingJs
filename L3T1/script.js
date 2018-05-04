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
  // creating Fridge without 'power' leads to unlimited maxFood
  Machine.call(this, power);

  let totalFood = [];
  const maxFoodQuantity = this._power / 100;

  this.addFood = function(item) {
    if (!this._enabled) {
      throw new Error('Enable the fridge first!');
    }

    const foodToAdd = [...totalFood, ...arguments];

    if (foodToAdd.length > maxFoodQuantity) {
      throw new Error('There is too match food in the fridge!');
    }

    totalFood = foodToAdd;
  };

  this.getFood = function(item) {
    // assuming the food is a flat array
    return [...totalFood];
  };
}

// tests in 'test' folder