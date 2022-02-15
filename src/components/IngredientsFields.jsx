import React, { useState, useEffect } from "react";
import { TextField, Button, Select, MenuItem } from "@mui/material";
import Recipes from "../modules/Recipes";

const IngredientsFields = ({ fields, inputList, setInputList }) => {
  const [ingredients, setIngredients] = useState([]);

  const fetchIngredients = async () => {
    const response = await Recipes.getIngredients();
    if (!response.message) {
      setIngredients(response);
    }
  };

  useEffect(() => {
    fetchIngredients();
  }, []);

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
            <Select
              data-cy={`ingredient-name-${i}`}
              name="ingredient_id"
              value={item.ingredientId}
              label="Ingredient"
              defaultValue={""}
              onChange={(event) => handleInputChange(event, i)}
              size="small"
              sx={{ width: 100 }}
            >
              {ingredients.map((ingredient) => {
                return (
                  <MenuItem
                    key={ingredient.id}
                    value={ingredient.id}
                    data-cy={"ingredient-option-" + ingredient.id}
                  >
                    {ingredient.name}
                  </MenuItem>
                );
              })}
            </Select>
            <TextField
              data-cy={`unit-input-${i}`}
              name="unit"
              placeholder="Unit"
              value={item.unit}
              onChange={(event) => handleInputChange(event, i)}
              size="small"
              sx={{ maxWidth: 110 }}
            />
            <TextField
              data-cy={`amount-input-${i}`}
              name="amount"
              placeholder="Amount"
              value={item.amount}
              onChange={(event) => handleInputChange(event, i)}
              size="small"
              sx={{ maxWidth: 110 }}
            />
            {inputList.length !== 1 && (
              <Button
                data-cy={`remove-btn-${i}`}
                onClick={() => handleRemoveClick(i)}
                size="small"
                color="error"
                variant="contained"
              >
                -
              </Button>
            )}
            <div>
              {inputList.length - 1 === i && (
                <Button data-cy="add-ingredient-line" onClick={handleAddClick} size="small">
                  Add another...
                </Button>
              )}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default IngredientsFields;
