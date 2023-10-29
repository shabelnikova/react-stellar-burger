import React, {FC} from 'react';
import styles from './modal-overlay.module.css'
import {useLocation} from "react-router-dom";
interface IProps {
  closePopup: (path: string) => void
}
const ModalOverlay: FC<IProps> = ({closePopup}) => {
const location = useLocation();
  return (
    <div onClick={() => closePopup(location.pathname)} className={styles.overlay}>

    </div>
  );
};
export default ModalOverlay;
