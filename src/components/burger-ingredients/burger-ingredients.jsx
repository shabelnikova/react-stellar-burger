import styles from './burger-ingredients.module.css'
import cn from 'classnames';
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import {useState} from "react";
import BurgerIngredientsCategory from "../burger-ingredients-category/burger-ingredients-category";
import PropTypes from "prop-types";

const BurgerIngredients = ({ingredientDetailsHandler}) => {
  const [currentTab, setCurrentTab] = useState('buns')
  const onClickTab = (tab) => {
    setCurrentTab(tab);
    const element = document.getElementById(tab);
    if(element) {
      element.scrollIntoView({behavior: 'smooth'})
    }
  }

  return (
    <section className={cn(styles.cards)}>
      <div className={cn(styles.tab__container, 'mb-10')}>
        <Tab active={currentTab === 'buns'} value={'buns'} onClick={onClickTab}>Булки</Tab>
        <Tab active={currentTab === 'sauces'} value={'sauces'} onClick={onClickTab}>Соусы</Tab>
        <Tab active={currentTab === 'mains'} value={'mains'} onClick={onClickTab}>Начинки</Tab>
      </div>
      <div className={cn(styles.scroll__container)}>
        <BurgerIngredientsCategory setCurrentTab={setCurrentTab} ingredientDetailsHandler={ingredientDetailsHandler}/>
      </div>
    </section>
  )
}
BurgerIngredients.propTypes = {
  ingredientDetailsHandler: PropTypes.func
}

export default BurgerIngredients;
