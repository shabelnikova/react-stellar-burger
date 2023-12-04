import React, {useEffect} from 'react';
import BurgerIngredient from "../burger-ingredient/burger-ingredient";
import styles from './burger-ingredients-category.module.css';
import cn from 'classnames';
import {useInView} from "react-intersection-observer";
import {useAppSelector} from "../../services/hooks";

interface IProps {
  setCurrentTab(tab: string): void
}
const BurgerIngredientsCategory = ({setCurrentTab}: IProps) => {
  const {data, isLoading} = useAppSelector(state => state.ingredientsSlice)
  const buns = data.filter(el => el.type === 'bun');
  const mains = data.filter(el => el.type  === 'main');
  const sauces = data.filter(el => el.type  === 'sauce');

  const [bunsRef, inViewBuns] = useInView({
    threshold: 0,
  });
  const [mainsRef, inViewMains] = useInView({
    threshold: 0,
  });
  const [saucesRef, inViewSauces] = useInView({
    threshold: 0,
  });
  useEffect(() => {
    if(inViewBuns) {
      setCurrentTab('buns')
    } else if (inViewSauces) {
      setCurrentTab('sauces')
    } else if (inViewMains) {
      setCurrentTab('mains')
    }
  }, [inViewBuns, inViewMains, inViewSauces])
  if(isLoading)
    return <h1>Loading...</h1>
  return (
     <>
        <div id='buns' ref={bunsRef}>
          <h2 className={ "text text_type_main-medium mb-6"}>Булки</h2>
          <div className={cn(styles.cards__gallery, 'pl-4 pr-4')} >
            {buns.map((item) => <BurgerIngredient key={item._id} item={item} id={item._id}/>)}
          </div>
        </div>
        <div id='sauces' ref={saucesRef}>
          <h2 className={ "text text_type_main-medium mb-6"}>Соусы</h2>
          <div className={cn(styles.cards__gallery, 'pl-4 pr-4')}>
            {sauces.map((item) => <BurgerIngredient key={item._id} item={item} id={item._id}/>)}
          </div>
        </div>
        <div id='mains' ref={mainsRef}>
          <h2 className={ "text text_type_main-medium mb-6"}>Начинки</h2>
          <div className={cn(styles.cards__gallery, 'pl-4 pr-4')}>
            {mains.map((item) => <BurgerIngredient key={item._id} item={item} id={item._id}/>)}
          </div>
        </div>
      </>
  );
};

export default BurgerIngredientsCategory;