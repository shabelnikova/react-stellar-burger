import styles from "./app.module.css";

import {useEffect} from "react";
import AppHeader from "../app-header/app-header";
import cn from 'classnames';
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import {useDispatch} from "react-redux";
import {getAllItems} from "../../services/actions/ingredients-action";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllItems())

  }, []);

   return (
    <div className={styles.app}>
      <AppHeader/>
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
}

export default App;
