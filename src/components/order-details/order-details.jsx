import styles from '../modal/modal.module.css'
import cn from "classnames";
import React from 'react';
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import orderImage from '../../images/done.png'

const OrderDetails = () => {

  return (
     <div className='pt-15  pb-30 pl-10 pr-10' onClick={e => e.stopPropagation()}>
       <div className={cn(styles.modal__header)}>
         <p className={ "text text_type_main-large"}></p>
       </div>
     <div className={cn(styles.modal__info)}>
       <p className="text text_type_digits-large mb-8">367890</p>
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