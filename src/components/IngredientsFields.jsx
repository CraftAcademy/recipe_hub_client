import React, {useState, useEffect} from "react";
import { TextField, Button, Select, MenuItem } from "@mui/material";
import axios from 'axios'

const IngredientsFields = ({ fields, inputList, setInputList }) => {
  const [ingredients, setIngredients] = useState([])

  // const ingredients = [
    // { id: 1, name: "Sugar" },
    // { id: 2, name: "Water" },
    // { id: 3, name: "Rice" },
    // { id: 4, name: "Milk" },
  // ];

  const fetchIngredients = async () => {
    const {data } = await axios.get('http://localhost:3000/api/ingredients')
    setIngredients(data.ingredients)
  }
  useEffect(() => {
    fetchIngredients()
  }, [])

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  const handleAddClick = () => {
    setInputList([...inputList, fields]);
  };

  return (
    <>
      {inputList.map((item, i) => {
        return (
          <div key={`ingredient-fieldset-${i}`}>
            {/* <TextField
              name="ingredientId"
              placeholder="Enter ID"
              value={item.ingredientId}
              onChange={(event) => handleInputChange(event, i)}
            /> */}
            <Select
              name="ingredient_id"
              value={item.ingredientId}
              label="Ingredient"
              onChange={(event) => handleInputChange(event, i)}
            >
              {ingredients.map((ingredient) => {
                return (
                  <MenuItem value={ingredient.id}>{ingredient.name}</MenuItem>
                );
              })}
            </Select>

            <TextField
              name="unit"
              placeholder="Unit"
              value={item.unit}
              onChange={(event) => handleInputChange(event, i)}
            />
            <TextField
              name="amount"
              placeholder="Amount"
              value={item.amount}
              onChange={(event) => handleInputChange(event, i)}
            />
            {inputList.length !== 1 && (
              <Button
                data-cy={`remove-btn-${i}`}
                onClick={() => handleRemoveClick(i)}
              >
                -
              </Button>
            )}
            <div>
              {inputList.length - 1 === i && (
                <Button data-cy="add-ingredient-line" onClick={handleAddClick}>
                  Add another...
                </Button>
              )}
            </div>
          </div>
        );
      })}
      <div>{JSON.stringify(inputList)}</div>
    </>
  );
};

export default IngredientsFields;
