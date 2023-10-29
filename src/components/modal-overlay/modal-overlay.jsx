import React from 'react';
import styles from './modal-overlay.module.css'
import PropTypes from "prop-types";

const ModalOverlay = ({closePopup}) => {

  return (
    <div onClick={closePopup} className={styles.overlay}>

    </div>
  );
};

ModalOverlay.propTypes = {
  closePopup: PropTypes.func
}
export default ModalOverlay;
