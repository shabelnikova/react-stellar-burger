import React from 'react';
import styles from './orders-info.module.css';
import cn from 'classnames';
import {useAppSelector} from "../../services/hooks";
import {IOrdersElement} from "../../services/types";

const OrdersInfo = () => {
  const { orders, total, totalToday } = useAppSelector(state => state.dataReducer.data)

  const ordersReady = orders?.filter((el: IOrdersElement) => el.status === 'done')

  const ordersInWork = orders?.filter((el: IOrdersElement) => el.status !== 'done')

  return (
    <div className={cn(styles.container)}>
      <div className={cn(styles.orders_container)}>
        <div >
          <h2 className="text text_type_main-medium mb-6">Готовы:</h2>
          <ul className={cn(styles.orders_list, styles.ready_list_color, styles.columns_container, "text text_type_digits-default")}>
            {ordersReady?.map((el: IOrdersElement) => <li className={cn(styles.li_margin_bottom)} key={el._id}>{el.number}</li>)}
          </ul>
        </div>
        <div>
          <h2 className="text text_type_main-medium mb-6">В работе:</h2>
          <ul className={cn(styles.orders_list, styles.columns_container, "text text_type_digits-default")}>
            {ordersInWork?.map((el: IOrdersElement) => <li className={cn(styles.li_margin_bottom)} key={el._id}>{el.number}</li>)}
          </ul>
        </div>
      </div>
      <div>
        <h2 className="text text_type_main-medium">Выполнено за все время:</h2>
        <p className="text text_type_digits-large">{total}</p>
      </div>
      <div>
        <h2 className="text text_type_main-medium">Выполнено за сегодня:</h2>
        <p className="text text_type_digits-large">{totalToday}</p>
      </div>

    </div>
  );
};

export default OrdersInfo;