import React from 'react';
import styles from "../components/app/app.module.css";
import cn from "classnames";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import BurgerIngredients from "../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../components/burger-constructor/burger-constructor";

const HomePage = () => {
  return (
    <div className={styles.app}>
      <div className={cn(styles.title)}>
        <h1 className={ 'text text_type_main-large mt-10'}>Соберите бургер</h1>
      </div>
      <main className={cn(styles.main)}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      </main>
    </div>
  );
};
export default HomePage;