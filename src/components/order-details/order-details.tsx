import styles from '../modal/modal.module.css'
import cn from "classnames";
import React, {useEffect} from 'react';
import orderImage from '../../images/done.png'
import {orderNumberRequest} from "../../services/slice/orderSlice";
import {useAppDispatch, useAppSelector} from "../../services/hooks";

const OrderDetails = () => {
  const dispatch = useAppDispatch();

  const {items, bun} = useAppSelector(state => state.constructorSlice);
  const {orderNumber, isLoading} = useAppSelector(state => state.orderSlice);

  const idArray = items?.map(el => el._id);
  if(bun !== null) {
    idArray.push(bun._id);
    idArray.push(bun._id);
  }

  useEffect(() => {
    dispatch(orderNumberRequest(idArray));
  }, [])

  return (
     <div className='pt-15  pb-30 pl-10 pr-10' onClick={e => e.stopPropagation()} >
       <div className={cn(styles.modal__header)}>
         <p className={ "text text_type_main-large"}></p>
       </div>
     <div className={cn(styles.modal__info)}>
       <p className="text text_type_digits-large mb-8" data-cy="order-number">{isLoading ? 'Wait...' : orderNumber}</p>
       <p className="text text_type_main-medium">
         идентификатор заказа
       </p>
       <img className={'mb-15 mt-15'} src={orderImage} alt="иконка подтверждения заказа"/>
       <p className="text text_type_main-default mb-2">
         Ваш заказ начали готовить
       </p>
       <p className="text text_type_main-default text_color_inactive mb-2">
         Дождитесь готовности на орбитальной станции
       </p>
     </div>
    </div>
  );
};

export default OrderDetails;