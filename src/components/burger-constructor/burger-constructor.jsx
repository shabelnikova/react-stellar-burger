import styles from './burger-constructor.module.css'
import cn from 'classnames';
import {Button, ConstructorElement, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {useMemo} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useDrop} from "react-dnd";
import BurgerConstructorElement from "../burger-constructor-element/burger-constructor-element";
import {useLocation, useNavigate} from "react-router-dom";
import {addItem} from "../../services/slice/constructorSlice";


const BurgerConstructor = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const {items, bun} = useSelector(state => state.constructorSlice);
  const {isUserLoaded} = useSelector(state => state.userSlice);
  const navigate = useNavigate();
  const totalPrice = useMemo(() => {
    let res = 0;
    if (bun) {
      res += bun.price * 2
    }
    if (items) {
      res += items.reduce((acc, i) => acc + i.price, 0)
    }
    return res;
  }, [items, bun])

  const [{isOver, canDrop, itemDrag}, dropTarget] = useDrop({
    accept: 'ingredient',

    drop: (item) => (
      dispatch(addItem(item))
    ),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
      itemDrag: monitor.getItem()
    })
  })
const onClickHandler = () => {

    if(bun && items && isUserLoaded) {
      navigate('/order', {state: {background: location}})
    } else {
      navigate('/login');
    }

}

  // const isBun = itemDrag?.type === 'bun';
  // const isIngredient = itemDrag?.type !== 'bun';

  return (
    <>
      <section className={cn(styles.burger__constructor)} ref={dropTarget}>
        {bun && <div className={cn(styles.burger__item, 'ml-8 mb-4' +
          '')}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={bun.name + ' (верх)'}
            thumbnail={bun.image}
            price={bun.price}
          />
        </div>}
        <ul className={cn(styles.burger__list, styles.scroll__container)}>
          {items?.map((item, index) => {
            return (<BurgerConstructorElement
              key={item.uuid}
              index={index}
              item={item}
            />)
          })
          }
        </ul>
        {bun && <div className={cn(styles.burger__item, 'ml-8' +
          '')}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={bun.name + ' (низ)'}
            thumbnail={bun.image}
            price={bun.price}
          />
        </div>}
        <div className={cn(styles.burger__order, 'mt-10')}>

          <Button disabled={!bun && items} onClick={onClickHandler} htmlType="button" type="primary" size="large" >
            Оформить заказ
          </Button>

          <div className={cn(styles.burger__price, 'mr-10')}>
            <p className="text text_type_digits-medium">{totalPrice}</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </section>
    </>
  )
};

export default BurgerConstructor;
