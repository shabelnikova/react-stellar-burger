import React from 'react';
import styles from '../modal/modal.module.css'
import cn from 'classnames';
import { useParams} from "react-router-dom";
import { useAppSelector} from "../../services/hooks";

const IngredientDetails = () => {

  const {data} = useAppSelector(state => state.ingredientsSlice);
  const {id} = useParams();

  const ingredient = data?.find((el) => el._id === id);
if(ingredient) {
  return(
      <div className='pt-15 pb-15 pl-10 pr-10' onClick={e => e.stopPropagation()}>
        <div className={cn(styles.modal__header)}>
          <p className={ "text text_type_main-large"}>Детали ингредиента</p>
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
} else {
  return <h1 className={cn(styles.preloader)}>Loading...</h1>

}
};

export default IngredientDetails;
