import React, {FC, useCallback, useEffect} from 'react';
import styles from './pages.module.css'
import cn from "classnames";
import {NavLink, useLocation, useMatch} from "react-router-dom";
import {logoutUserRequest} from "../services/slice/userSlice";
import {useAppDispatch} from "../services/hooks";
import ProfileFormEdit from "../components/profile-edit/profile-form-edit";
import OrderCardsContainer from "../components/order-cards-container/order-cards-container";
import {wsConnect, wsDisconnect} from "../services/reducers/web-socket/actions";
import {getAccessToken} from "../utils/token";
const ProfilePage: FC = () => {
  const url = 'wss://norma.nomoreparties.space/orders';
  const queryTokenArr = getAccessToken()?.split(' ');
  let queryToken: string | null = null;
  if(queryTokenArr) {
    queryToken = queryTokenArr[1];
  }

  const dispatch = useAppDispatch()
  const handleLogout = useCallback(() => {
    dispatch(logoutUserRequest());
  }, [])

  useEffect(() => {
    dispatch(wsConnect(`${url}?token=${queryToken}`))
    return () => {
      dispatch(wsDisconnect())
    };
  }, [])
  const setClassName = ({isActive} : {isActive: boolean}) => {
    return cn(styles.profile_listEl, { [styles.link_active]: isActive}, 'text text_type_main-medium')
  }
  const isProfileOrders = useMatch( "/profile/orders" );
  const isProfile = useMatch("/profile" );

  return (
    <div className={cn(styles.profile_wrapper)} >
      <nav className={cn(styles.profile_list)}>
        <NavLink
          to={'/profile'}
          end
          className={setClassName} >
          Профиль
        </NavLink>
        <NavLink
          to={'/profile/orders'}
          className={setClassName}>
          История заказов
        </NavLink>
        <NavLink
          to={'/'}
          onClick={handleLogout}
          className={setClassName}>
          Выход
        </NavLink>
        <p className="text text_type_main-default text_color_inactive mt-15">В этом разделе вы можете
          изменить свои персональные данные</p>
      </nav>
      {isProfile ? <ProfileFormEdit/> : <OrderCardsContainer/>}

    </div>
  );
};


export default ProfilePage;
