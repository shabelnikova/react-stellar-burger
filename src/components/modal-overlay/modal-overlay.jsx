import React from 'react';
import styles from './modal-overlay.module.css'
import PropTypes from "prop-types";
import {useDispatch} from "react-redux";
import {clearIngredientInfo} from "../../services/actions/ingredient-details-action";


const ModalOverlay = ({setActive}) => {

  const dispatch = useDispatch();
  return (
    <div onClick={() => {setActive(false); dispatch(clearIngredientInfo())}} className={styles.overlay}>

    </div>
  );
};

ModalOverlay.propTypes = {
  setActive: PropTypes.func
}
export default ModalOverlay;
