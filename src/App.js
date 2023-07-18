import React, { useState } from 'react';
import items from './items.json';

// Assume you have your JSON data in a variable called items.json


const itemsData = JSON.parse(JSON.stringify(items));

const App = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState('');

  const handleItemSelect = (item) => {
    setSelectedItem(item);
    setQuantity(''); // Reset quantity input when a new item is selected
  };

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const calculateIngredientQuantities = () => {
    if (!selectedItem || !quantity) {
      return {};
    }

    const ingredientQuantities = {};
    const multiplier = parseFloat(quantity) / parseFloat(selectedItem.unit);

    for (const [ingredient, quantityPerUnit] of Object.entries(selectedItem.ingredients)) {
      ingredientQuantities[ingredient] = quantityPerUnit * multiplier;
    }

    return ingredientQuantities;
  };

  const ingredientQuantities = calculateIngredientQuantities();

  return (
    <div>
      <h1>Select an item and enter quantity:</h1>
      <div>
        {itemsData.map((item, index) => (
          <button key={index} onClick={() => handleItemSelect(item)}>
            {item.title}
          </button>
        ))}
      </div>
      {selectedItem && (
        <div>
          <p>Selected Item: {selectedItem.title}</p>
          <p>Unit: {selectedItem.unit}</p>
          <input
            type="number"
            placeholder="Enter quantity"
            value={quantity}
            onChange={handleQuantityChange}
          />
          {quantity && (
            <div>
              <h2>Ingredient Quantities:</h2>
              <ul>
                {Object.entries(ingredientQuantities).map(([ingredient, quantity]) => (
                  <li key={ingredient}>
                    {ingredient}: {quantity} units
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
