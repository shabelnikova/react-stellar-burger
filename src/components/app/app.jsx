import styles from "./app.module.css";

import React, {useEffect, useState} from "react";
import AppHeader from "../app-header/app-header";
import cn from 'classnames';
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import {useDispatch} from "react-redux";
import {getAllItems} from "../../services/actions/ingredients-action";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import {showIngredientInfo} from "../../services/actions/ingredient-details-action";


function App() {
  const dispatch = useDispatch();
  const [isActive, setActive] = useState(false);

  useEffect(() => {
    dispatch(getAllItems())

  }, []);
  const ingredientDetailsHandler = (ingredient) => {
    setActive(true);
    dispatch(showIngredientInfo(ingredient));
  }

   return (
    <div className={styles.app}>
      <AppHeader/>
      <div className={cn(styles.title)}>
        <h1 className={ 'text text_type_main-large mt-10'}>Соберите бургер</h1>
      </div>
      <main className={cn(styles.main)}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients ingredientDetailsHandler={ingredientDetailsHandler}/>
          <BurgerConstructor />
        </DndProvider>
      </main>
      {isActive && <Modal setActive={setActive}>
        <IngredientDetails />
      </Modal>}
    </div>
  );
}

export default App;
