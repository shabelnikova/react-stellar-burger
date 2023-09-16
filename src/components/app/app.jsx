import styles from "./app.module.css";
import { data } from "../../utils/data";
import {useEffect, useState} from "react";
import AppHeader from "../app-header/app-header";
import cn from 'classnames';
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

function App() {
  const url = 'https://norma.nomoreparties.space/api/ingredients';
  const [ingredients, setIngredients] = useState({data});
  useEffect(() => {
    const serverData = async() => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
      }
        const result = await response.json();
        setIngredients(result);

    } catch (err) {
        console.error('Error fetching data:', err);
      }
    }
    serverData();

  }, []);

   return (
    <div className={styles.app}>
      <AppHeader/>
      <div className={cn(styles.title)}>
        <h1 className={ 'text text_type_main-large mt-10'}>Соберите бургер</h1>
      </div>
      <main className={cn(styles.main)}>
        <BurgerIngredients burgerData={ingredients.data} />
        <BurgerConstructor burgerData={ingredients.data} />
      </main>
    </div>
  );
}

export default App;
