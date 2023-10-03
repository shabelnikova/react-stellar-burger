import React, {useEffect, useMemo} from 'react';
import styles from './modal.module.css'
import cn from "classnames";
import {createPortal} from "react-dom";
import ModalOverlay from "../modal-overlay/modal-overlay";
import PropTypes from "prop-types";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch, useSelector} from "react-redux";
import {clearIngredientInfo} from "../../services/actions/ingredient-details-action";

const modalRoot = document.querySelector('#modal-root');
const Modal = ({children, setActive}) => {
  const element = useMemo(() => document.createElement('div'), []);
  const dispatch = useDispatch();
  const closePopup = (e) => {
    if(e.key === 'Escape') {
      setActive(false);
      dispatch(clearIngredientInfo());
    }
  }
  useEffect(() => {
    modalRoot.appendChild(element)
    document.addEventListener('keydown', (closePopup))
  return () => {
    modalRoot.removeChild(element);
    document.removeEventListener('keydown', (closePopup));
  }

  }, [])
  return createPortal(
    <>
      <div className={cn(styles.modal)}>
        <div className={cn(styles.modal__closeIcon)}>
          <CloseIcon type="primary" onClick={() => {setActive(false); dispatch(clearIngredientInfo())}}/>
        </div>
        {children}
      </div>
      <ModalOverlay setActive={setActive}/>
    </>, element
  );
};
Modal.propTypes = {
  children: PropTypes.element,
  setActive: PropTypes.func
}
export default Modal;


