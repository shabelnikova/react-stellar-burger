import React, {useEffect} from 'react';
import styles from './order-details-info.module.css'
import cn from 'classnames';
import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import {useAppDispatch, useAppSelector} from "../../services/hooks";
import {useNavigate, useParams} from "react-router-dom";
import { showOrderInfo} from "../../services/slice/orderSlice";

import {getOrderByNumber} from "../../utils/api";

interface IObj {
  [name: string]: number
}
const OrderDetailsInfo = () => {
  const dispatch = useAppDispatch();
  const {order, ingredients, totalPrice} = useAppSelector(state => state.orderSlice.orderInfo);
  const {data} = useAppSelector(state => state.ingredientsSlice);
  const navigate = useNavigate();
const {number} = useParams();

  useEffect(() => {
    let orderInfo = null;
    if(!order) {
      getOrderByNumber(+number!)
        .then(res => {
          if(res.orders.length === 0) {
            navigate('/not-found');
            return;
          }
          const getOrderIngredient = (id: string) => {
            return data?.find((el) => el._id === id);
          }
          const getOrderIngredientArray = (array: string[]) => {
            return array?.map((el) => getOrderIngredient(el))
          }
          const ingredientsArray = getOrderIngredientArray(res.orders[0].ingredients);
          const total = () => {
            let res = 0;
            if(ingredientsArray[0]) {
              res += ingredientsArray.reduce((acc, i) => acc + i!.price, 0)
            }
            return res;
          }
          orderInfo = {
             totalPrice: total(),
             ingredients: ingredientsArray,
             order: res.orders[0]
          }
          dispatch(showOrderInfo(orderInfo));
        })

    }
  }, [order, dispatch, data])

  const ingredientsQuantityObj = ingredients?.reduce((acc: IObj, i) => {
    acc[i?._id] = acc[i?._id] ? acc[i?._id] +1 : 1;
    return acc;
  }, {});
  const setIngredients = new Set(ingredients);
  const arrayIngredientsWithoutDouble = Array.from(setIngredients);

  const date  = () => {
    if(order) {
      const dateFromServer = order.createdAt
      return <FormattedDate date={new Date(dateFromServer)} />
    }
  }
  return (
    <div className={cn(styles.container, 'pt-15 pb-15 pl-10 pr-10')}>
      <div className={cn(styles.heading)}>
        <p className="text text_type_digits-default">{order?.number}</p>
      </div>
      <p className="text text_type_main-medium mt-10">{order?.name
      }</p>
      {order?.status === 'done' ?
        <p className={cn(styles.status_ready, "text text_type_main-default mt-3")}>Выполнен</p>:
        <p className={ "text text_type_main-default mt-3"}>Готовится</p>
      }
      <p className="text text_type_main-medium mt-15">Состав:</p>
      <div className={cn(styles.scroll__container, 'mt-6')}>
        <ul className={cn(styles.items_info)}>
          {arrayIngredientsWithoutDouble?.map((el, index) =>
            <li className={cn(styles.item)} key={index}>
              <img className={cn(styles.image)} src={el?.image_mobile} alt={el?.name}/>
              <p className={cn(styles.item_name, "text text_type_main-default")}>{el?.name}</p>
              <div className={cn(styles.price)}>
                <p className="text text_type_digits-default">{ingredientsQuantityObj[el?._id]} x {el?.price}</p>
                <CurrencyIcon type={"primary"}/>
              </div>
            </li>
          )}
        </ul>
      </div>
      <footer className={cn(styles.footer, 'mt-10')}>
        <p className="text text_type_main-default text_color_inactive">{date()}</p>
        <div className={cn(styles.footer_total)}>
          <p className="text text_type_digits-default">{totalPrice}</p>
          <CurrencyIcon type={"primary"}/>
        </div>
      </footer>
    </div>
  );
};
export default OrderDetailsInfo;



