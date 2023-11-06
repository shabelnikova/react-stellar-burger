import React, {useEffect} from 'react';
import cn from 'classnames';
import styles from "../components/app/app.module.css";
import OrderCardsContainer from "../components/order-cards-container/order-cards-container";
import OrdersInfo from "../components/orders-info/orders-info";
import {useAppDispatch} from "../services/hooks";
import {wsConnect, wsDisconnect} from "../services/reducers/web-socket/actions";
import {useLocation} from "react-router-dom";


const OrderFeedPage = () => {
  const dispatch = useAppDispatch();
  const url = 'wss://norma.nomoreparties.space/orders/all';
  const location = useLocation();
  console.log(location)
  useEffect(() => {
    dispatch(wsConnect(url))
    return () => {
      dispatch(wsDisconnect())
    };
  }, [])
    return (
        <section className={styles.app}>
            <div className={cn(styles.title)}>
                <h1 className={ 'text text_type_main-large mt-10'}>Лента заказов</h1>
            </div>
            <main className={cn(styles.order_feed_container)}>
              <OrderCardsContainer />
              <OrdersInfo/>
            </main>
        </section>
    );
};

export default OrderFeedPage;




