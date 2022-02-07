import React from "react";
import { TableRow, TableCell, TableBody, Table } from "@mui/material";

const IngredientsList = ({ ingredients }) => {
  const ingredientsList = ingredients?.map((ingredient, index) => {
    ingredient.index = index + 1;
    return (
      <TableRow
        key={ingredient.index}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <TableCell
          component="th"
          scope="row"
          data-cy={`ingredient-name-${ingredient.index}`}
        >
          {ingredient.name}
        </TableCell>
        <TableCell
          align="right"
          data-cy={`ingredient-quantity-${ingredient.index}`}
        >
          {`${ingredient.amount} ${ingredient.unit}`}
        </TableCell>
      </TableRow>
    );
  });

  return (
    <Table sx={{ width: 230 }}>
      <TableBody data-cy="ingredients-list">{ingredientsList}</TableBody>
    </Table>
  );
};

export default IngredientsList;
