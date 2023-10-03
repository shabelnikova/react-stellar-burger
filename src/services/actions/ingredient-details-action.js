export const INGREDIENT_DETAILS_INFO = 'INGREDIENT_DETAILS_INFO';
export const INGREDIENT_DETAILS_CLEAR = 'INGREDIENT_DETAILS_CLEAR';
export const showIngredientInfo = (ingredient) => {
  return {
    type: INGREDIENT_DETAILS_INFO,
    payload: ingredient
  }
}
export const clearIngredientInfo = () => {
  return {
    type: INGREDIENT_DETAILS_CLEAR
  }
}