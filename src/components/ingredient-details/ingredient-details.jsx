import React from 'react';
import styles from '../modal/modal.module.css'
import cn from 'classnames';

import {ingredientPropType} from "../../utils/prop-types";
import PropTypes from "prop-types";
import {useSelector} from "react-redux";

const IngredientDetails = () => {
  const {ingredient} = useSelector(state => state.ingredientDetails);

  return (
    <div className='pt-15 pb-15 pl-10 pr-10' onClick={e => e.stopPropagation()}>
      <div className={cn(styles.modal__header)}>
        <p className={ "text text_type_main-large" }>Детали ингредиента</p>

      </div>
      <div className={cn(styles.modal__info)}>
        <img src={ingredient.image_large} alt={ingredient.name} className='mb-4'/>
        <p className="text text_type_main-medium mb-8">
          {ingredient.name}
        </p>
        <div className={cn(styles.nutritional__block)}>
          <div className={cn(styles.nutritional__value)}>
            <p className="text text_type_main-default text_color_inactive">Калории,ккал</p>
            <p className="text text_type_digits-default text_color_inactive">{ingredient.calories}</p>
          </div>
          <div className={cn(styles.nutritional__value)}>
            <p className="text text_type_main-default text_color_inactive">Белки, г</p>
            <p className="text text_type_digits-default text_color_inactive">{ingredient.proteins}</p>
          </div>
          <div className={cn(styles.nutritional__value)}>
            <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
            <p className="text text_type_digits-default text_color_inactive">{ingredient.fat}</p>
          </div>
          <div className={cn(styles.nutritional__value)}>
            <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
            <p className="text text_type_digits-default text_color_inactive">{ingredient.carbohydrates}</p>
          </div>
        </div>
      </div>
    </div>

  );
};
IngredientDetails.propTypes = {
  ingredientPropType,
  onClose: PropTypes.func
}
export default IngredientDetails;
