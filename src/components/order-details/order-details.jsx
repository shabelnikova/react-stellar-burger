import styles from '../modal/modal.module.css'
import cn from "classnames";
import React, {useEffect} from 'react';
import orderImage from '../../images/done.png'
import {useDispatch, useSelector} from "react-redux";
import {orderNumberRequest, resetOrderNumber} from "../../services/slice/orderSlice";

const OrderDetails = () => {
  const dispatch = useDispatch();

  const {items, bun} = useSelector(state => state.constructorSlice);
  const {orderNumber, isLoading} = useSelector(state => state.orderSlice);

  const idArray = items?.map(el => el._id);
  idArray.push(bun?._id);
  useEffect(() => {
    dispatch(orderNumberRequest(idArray));
    return () => dispatch(resetOrderNumber())
  }, [])

  return (
     <div className='pt-15  pb-30 pl-10 pr-10' onClick={e => e.stopPropagation()}>
       <div className={cn(styles.modal__header)}>
         <p className={ "text text_type_main-large"}></p>
       </div>
     <div className={cn(styles.modal__info)}>
       <p className="text text_type_digits-large mb-8">{isLoading ? 'Wait...' : orderNumber}</p>
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