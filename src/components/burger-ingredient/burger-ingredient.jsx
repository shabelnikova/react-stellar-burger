import React, {useMemo} from 'react';
import styles from "../burger-ingredient/burger-ingredient.module.css";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import cn from 'classnames';
import {ingredientPropType} from "../../utils/prop-types";
import {useDrag} from "react-dnd";
import {useDispatch, useSelector} from "react-redux";
import PropTypes from "prop-types";
import {Link, useLocation, useParams} from "react-router-dom";
import {showIngredientInfo} from "../../services/slice/ingredientsSlice";



const BurgerIngredient = ({item: ingredient,  id}) => {
  const {items, bun} = useSelector(state => state.constructorSlice)
  const dispatch = useDispatch();
  const location = useLocation()

  const count = useMemo(() => {
    let res = 0;
    if(ingredient.type === 'bun' && bun && bun._id === ingredient._id) {
      res = 1;
    }
    if(ingredient.type !== 'bun' && items) {
      res = items.filter(i => i._id === ingredient._id).length;
    }
    return res;
  }, [items, bun])

  const [{isDrag}, dragRef] = useDrag({
    type: 'ingredient',
    item: ingredient,
    collect: (monitor) => ({
      isDrag: monitor.isDragging()
    })
  })
  const ingredientDetailsHandler = (ingredient) => {
    dispatch(showIngredientInfo(ingredient));
  }

  return (
            <Link
              to={`/ingredients/${id}`}
              state={{background: location}}
              replace
              ref={dragRef}
              onClick={() => ingredientDetailsHandler(ingredient)}
              className={cn(styles.card, 'pl-4 pr-4')}
              style={{opacity: isDrag ? .2 : 1}}>
              <img className={cn(styles.cards__img)}
                   src={ingredient.image}
                   alt={ingredient.name}/>
              <div className={cn(styles.card__price, 'text text_type_digits-default')}>
                <p className={cn(styles.card__digits)}>{ingredient.price}</p>
                <CurrencyIcon type={"primary"}/>
              </div>
              <p className={cn(styles.card__description, 'text text_type_main-default' +
                '')}>{ingredient.name}</p>
              {count > 0 && <Counter count={count} size="default" extraClass="m-1" />}
            </Link>
  );
};
BurgerIngredient.propTypes = {
  ingredient: ingredientPropType,
  id: PropTypes.string,
}
export default BurgerIngredient;
