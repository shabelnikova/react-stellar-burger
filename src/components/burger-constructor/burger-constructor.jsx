import styles from './burger-constructor.module.css'
import cn from 'classnames';
import {Button, ConstructorElement, CurrencyIcon, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import {useState} from "react";
import OrderDetails from "../order-details/order-details";
import {burgerDataPropType} from "../../utils/prop-types";

const BurgerConstructor = ({burgerData}) => {
  const [isActive, setActive] = useState(false);
  const buns = burgerData.filter(el => el.type === 'bun');
  const mainsAndSauces = burgerData.filter(el => el.type !== 'bun');
  const getRandomArrIndex = (array) => {
    return Math.floor(Math.random() * array.length);
  }
  const randomBun = buns[getRandomArrIndex(buns)];

  let sum = randomBun.price * 2  + mainsAndSauces.reduce((acc, i) => {
    return acc + i.price
  }, 0);
  return <>
    <section className={cn(styles.burger__constructor)}>
      <div className={cn(styles.burger__item, 'ml-8 mb-4' +
        '')}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={randomBun.name + ' (верх)'}
          thumbnail={randomBun.image}
          price={randomBun.price}
        />
      </div>
      <ul className={cn(styles.burger__list, styles.scroll__container)}>
        {mainsAndSauces.map((item, index) => <li className={cn(styles.burger__item, 'mb-4 mr-2 ml-4')} key={index}>
            <DragIcon type="primary" />
            <ConstructorElement text={item.name} thumbnail={item.image} price={item.price}/>
          </li>)}
      </ul>
      <div className={cn(styles.burger__item, 'ml-8' +
        '')}>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={randomBun.name + ' (низ)'}
          thumbnail={randomBun.image}
          price={randomBun.price}
        />
      </div>

      <div className={cn(styles.burger__order, 'mt-10')}>
        <Button onClick={() => setActive(true)} htmlType="button" type="primary" size="large" >
          Оформить заказ
        </Button>
        <div className={cn(styles.burger__price, 'mr-10')}>
          <p className="text text_type_digits-medium">{sum}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </section>
    {isActive && <Modal isActive={isActive} setActive={setActive}>
      <OrderDetails onClose={() => setActive(false)}/>
    </Modal>}
  </>;
};
BurgerConstructor.propTypes = {
  burgerDataPropType
}

export default BurgerConstructor;
