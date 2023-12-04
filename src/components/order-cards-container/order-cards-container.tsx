import React from 'react';
import OrderCard from "../order-card/order-card";
import cn from 'classnames';
import styles from './order-cards-container.module.css'
import {useAppSelector} from "../../services/hooks";
import {IIngredientType} from "../../utils/types";
import {IOrdersElement} from "../../services/types";
import {useLocation} from "react-router-dom";

const OrderCardsContainer = () => {
  const {data} = useAppSelector(state => state.ingredientsSlice);
  const { orders } = useAppSelector(state => state.dataReducer.data);
  const {isUserLoaded} = useAppSelector(state => state.userSlice);
  const location = useLocation();

  const getOrderIngredient = (id: string) => {
    return data?.find((el) => el._id === id);
  }
  const getOrderIngredientArray = (array: string[]) => {
    return array?.map((el) => getOrderIngredient(el))
  }
  if(isUserLoaded && location.pathname.includes('profile')) {
    return (
      <div className={cn(styles.scroll__container_user)}>
        {orders?.map((el: IOrdersElement) => {
          const ordersIngredientArray = getOrderIngredientArray(el.ingredients);
          return <OrderCard
            key={el.number}
            ordersIngredientArray={ordersIngredientArray as IIngredientType[]}
            order={el}
          />
        })}
      </div>
    );
  } else {
    return (
      <div className={cn(styles.scroll__container)}>
        {orders?.map((el: IOrdersElement) => {
          const ordersIngredientArray = getOrderIngredientArray(el.ingredients);
          return <OrderCard
            key={el.number}
            ordersIngredientArray={ordersIngredientArray as IIngredientType[]}
            order={el}
          />
        })}
      </div>
    );
  }
};

export default OrderCardsContainer;