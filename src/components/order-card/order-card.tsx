import React, {useMemo} from 'react';
import cn from 'classnames';
import styles from './order-card.module.css'
import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import {IOrdersElement} from "../../services/types";
import {IIngredientType} from "../../utils/types";
import {useAppDispatch, useAppSelector} from "../../services/hooks";
import {showOrderInfo} from "../../services/slice/orderSlice";
import {Link, useLocation} from "react-router-dom";

interface IProps {
  order: IOrdersElement
  ordersIngredientArray: IIngredientType[]

}
const OrderCard = ({order, ordersIngredientArray }: IProps) => {
 const {isUserLoaded} = useAppSelector(state => state.userSlice)
  const location = useLocation();
  const id = order._id;
  const number = order.number;
  const dispatch = useAppDispatch();

  const NUMBER_SHOW_INGREDIENTS = 5;
  let numberHiddenIngredients = 0;
  let hiddenImg = '';
  let ordersArrayToShow = [...ordersIngredientArray];
  const checkNumberIngredients = () => {
    if(ordersArrayToShow?.length > NUMBER_SHOW_INGREDIENTS) {
      numberHiddenIngredients = ordersArrayToShow.length - NUMBER_SHOW_INGREDIENTS;
      hiddenImg = ordersArrayToShow[NUMBER_SHOW_INGREDIENTS].image_mobile;
      ordersArrayToShow.splice(NUMBER_SHOW_INGREDIENTS);
      return true;
    }
    return false;
  }
  const orderStatus = () => {
    switch (order?.status) {
      case 'created': {
        return 'Создан'
      }
      case 'pending': {
        return 'Готовится'
      }
      case 'done': {
        return 'Выполнен'
      }
      default:
        return '';
    }
  }

  const totalPrice = useMemo(() => {
    let res = 0;
    if (ordersIngredientArray) {
      res += ordersIngredientArray.reduce((acc, i) => acc + i?.price, 0)
    }
    return res;
  }, [ordersIngredientArray])
  const date  = () => {
    const dateFromServer = order.createdAt
    return <FormattedDate date={new Date(dateFromServer)} />
  }

  const orderHandler = () => {
    const orderInfo = {
      totalPrice: totalPrice,
      ingredients: ordersIngredientArray,
      order: order
    }
    dispatch(showOrderInfo(orderInfo));
  }
  const commonPartCard = (
    <div className={cn(styles.preview_container)}>
      <div className={cn(styles.icons_container)}>
        {!checkNumberIngredients() ?
          ordersIngredientArray.map((el, index) =>
            <span style={{zIndex: `${NUMBER_SHOW_INGREDIENTS - index}`}} key={index} className={cn(styles.ingredient_icon)}>
                <img className={cn(styles.ingredient_img)} src={el?.image_mobile} alt={el?.name} key={index}/>
              </span>) :
          ordersArrayToShow.map((el, index) =>
            <span style={{zIndex: `${NUMBER_SHOW_INGREDIENTS - index}`}} key={index} className={cn(styles.ingredient_icon)}>
                <img className={cn(styles.ingredient_img)} src={el?.image_mobile} alt={el?.name} key={index}/>
              </span>)}
        {hiddenImg && <span className={cn(styles.ingredient_icon)}>
                 <img className={cn(styles.ingredient_img)} src={hiddenImg} alt=""/>
                 <div className={cn(styles.img_last)}>
                   <p className={cn(styles.number, "text text_type_digits-default")}>+{numberHiddenIngredients}</p>
                 </div>
               </span>}

      </div>
      <div className={cn(styles.container_price)}>
        <p className={'text text_type_digits-default'}>{totalPrice}</p>
        <CurrencyIcon type="primary" />
      </div>
    </div>
  )
if(isUserLoaded && location.pathname.includes('profile')) {
  return (
    <Link
      to={`/profile/orders/${number}`}
      state={{background: location}}
      onClick={orderHandler}
      className={cn(styles.container_user_order, 'p-6 mb-6')} >
      <div className={cn(styles.order_heading)}>
        <p className={'text text_type_digits-default'}>{order.number}</p>
        <p className={'text text_type_main-default text_color_inactive'}>
          {date()}
        </p>
      </div>
      <div>
        <p className={cn(styles.order_name, "text text_type_main-medium")}>{order.name}</p>
        {order.status !== 'done' ? <p className="text text_type_main-default mt-2">{orderStatus()}</p> :
          <p className={cn(styles.done_color, "text text_type_main-default mt-2")}>{orderStatus()}</p>
        }
      </div>
      {commonPartCard}
    </Link>
  );

} else {
  return (
    <Link
      to={`/feed/${number}`}
      state={{background: location}}
      onClick={orderHandler}
      className={cn(styles.container, 'p-6 mb-6')} >
      <div className={cn(styles.order_heading)}>
        <p className={'text text_type_digits-default'}>{order?.number}</p>
        <p className={'text text_type_main-default text_color_inactive'}>
          {date()}
        </p>
      </div>
      <p className={cn(styles.order_name, "text text_type_main-medium")}>{order?.name}</p>
      {commonPartCard}
    </Link>
  );
}
};

export default OrderCard;