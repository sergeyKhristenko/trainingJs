
describe('Tests for L3T1 task', () => {
  let fridge;
  
  beforeEach(() => {
    fridge = new Fridge(500);
    fridge.enable();    
  });

  it('Create Fridge', () => {
    expect(fridge).toBeTruthy();
  });

  it('error if Fridge wasn`t enabled at first', () => {
    const fridge2 = new Fridge();

    expect(() => fridge2.addFood('apple')).toThrow();
  });

  it('add 1 item', () => {
    fridge.addFood('apple');

    expect(fridge.getFood()).toEqual(['apple']);
  });

  it('add 2 items', () => {
    fridge.addFood('apple', 'banana', 'tomato');

    expect(fridge.getFood()).toEqual(['apple', 'banana', 'tomato']);
  });

  it('maxItems should be power/100', () => {
    // only one item should be allowed with this power
    const fridge2 = new Fridge(100);
    fridge2.enable();

    expect(() => fridge2.addFood('apple')).not.toThrow();
    expect(() => fridge2.addFood('banana')).toThrow();    
  });

  it('reaching maxItems shouldn`t affected the main food array', () => {
    const fridge2 = new Fridge(100);
    fridge2.enable();

    expect(() => fridge2.addFood('apple')).not.toThrow();
    expect(() => fridge2.addFood('banana')).toThrow();
    expect(fridge2.getFood()).toEqual(['apple']);
  });
});
