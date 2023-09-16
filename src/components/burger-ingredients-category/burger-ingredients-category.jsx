import React from 'react';
import BurgerIngredient from "../burger-ingredient/burger-ingredient";
import styles from './burger-ingredients-category.module.css';
import cn from 'classnames';
import {burgerDataPropType} from "../../utils/prop-types";

const BurgerIngredientsCategory = ({burgerData}) => {
  const buns = burgerData.filter(el => el.type === 'bun');
  const mains = burgerData.filter(el => el.type  === 'main');
  const sauces = burgerData.filter(el => el.type  === 'sauce');
  return (
    <>
      <h2 className={ "text text_type_main-medium mb-6"}>Булки</h2>
      <div className={cn(styles.cards__gallery, 'pl-4 pr-4')} >
        {buns.map((item) => <BurgerIngredient key={item._id} item={item}/>)}
      </div>
      <h2 className={ "text text_type_main-medium mb-6"}>Соусы</h2>
      <div className={cn(styles.cards__gallery, 'pl-4 pr-4')}>
        {sauces.map((item) => <BurgerIngredient key={item._id} item={item}/>)}
      </div>
      <h2 className={ "text text_type_main-medium mb-6"}>Начинки</h2>
      <div className={cn(styles.cards__gallery, 'pl-4 pr-4')}>
        {mains.map((item) => <BurgerIngredient key={item._id} item={item}/>)}
      </div>
    </>
  );
};
BurgerIngredientsCategory.propTypes = {
  burgerDataPropType
}
export default BurgerIngredientsCategory;