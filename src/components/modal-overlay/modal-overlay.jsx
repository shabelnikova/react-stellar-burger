import React from 'react';
import styles from './modal-overlay.module.css'
import PropTypes from "prop-types";

const ModalOverlay = ({setActive}) => {
  return (
    <div onClick={() => setActive(false)} className={styles.overlay}>

    </div>
  );
};

ModalOverlay.propTypes = {
  setActive: PropTypes.func
}
export default ModalOverlay;