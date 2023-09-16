import styles from './burger-ingredients.module.css'
import cn from 'classnames';
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import {useState} from "react";
import BurgerIngredientsCategory from "../burger-ingredients-category/burger-ingredients-category";
import {burgerDataPropType} from "../../utils/prop-types";

const BurgerIngredients = ({burgerData}) => {
  const [current, setCurrent] = useState('Булки')
  return (
    <section className={cn(styles.cards)}>
      <div style={{ display: 'flex'}} className={'mb-10'}>
        <Tab active={current === 'Булки'} value={'Булки'} onClick={setCurrent}>Булки</Tab>
        <Tab active={current === 'Соусы'} value={'Соусы'} onClick={setCurrent}>Соусы</Tab>
        <Tab active={current === 'Начинки'} value={'Начинки'} onClick={setCurrent}>Начинки</Tab>
      </div>
      <div className={cn(styles.scroll__container)}>
        <BurgerIngredientsCategory burgerData={burgerData}/>
      </div>
    </section>
  )
}
BurgerIngredients.propTypes = {
  burgerDataPropType
}
export default BurgerIngredients;
