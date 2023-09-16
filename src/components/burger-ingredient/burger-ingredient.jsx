import React, {useState} from 'react';
import styles from "../burger-ingredient/burger-ingredient.module.css";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import cn from 'classnames';
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import {ingredientPropType} from "../../utils/prop-types";

const BurgerIngredient = ({item}) => {
  const [isActive, setActive] = useState(false);
  return (
          <>
            <div onClick={() => setActive(true)} className={cn(styles.card, 'pl-4 pr-4')} >
              <img className={cn(styles.cards__img)} src={item.image} alt={item.name}/>
              <div className={cn(styles.card__price, 'text text_type_digits-default')}>
                <p className={cn(styles.card__digits)}>{item.price}</p>
                <CurrencyIcon type={"primary"}/>
              </div>
              <p className={cn(styles.card__description, 'text text_type_main-default' +
                '')}>{item.name}</p>
              <Counter count={0} size="default" extraClass="m-1" />
            </div>
            {isActive && <Modal isActive={isActive} setActive={setActive}>
              <IngredientDetails onClose={() => setActive(false)}
              item={item}
              />
            </Modal>}
          </>
  );
};
BurgerIngredient.propTypes = {
  ingredientPropType
}
export default BurgerIngredient;
