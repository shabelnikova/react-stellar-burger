import React, {useCallback, useState} from 'react';
import styles from './pages.module.css'
import cn from "classnames";
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch, useSelector} from "react-redux";
import {NavLink} from "react-router-dom";
import {logoutUserRequest, updateUserRequest} from "../services/slice/userSlice";
const ProfilePage = () => {
  const inputLoginRef = React.useRef(null)
  const userData = useSelector(state => state.userSlice.data);
  const dispatch = useDispatch();
  const [user, setUser] = useState({name: userData.name, email: userData.email, password: 'password'});
  const [oldUser, setOldUser] = useState({name: userData.name, email: userData.email, password: 'password'})

  const onChange = e => {
    const {name, value} = e.target;
    setUser({
      ...user,
      [name]: value
    })
  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUserRequest(user))
  }
  const handleRestore = (e) => {
    e.preventDefault();
    setUser(oldUser);
  }
const handleLogout = useCallback(() => {
  dispatch(logoutUserRequest());
}, [])

  return (
    <form className={cn(styles.profile_wrapper)} onSubmit={submitHandler}>
      <nav className={cn(styles.profile_list)}>
        <NavLink to={'/profile'} className={cn(styles.profile_listEl, "text text_type_main-medium ")} >Профиль</NavLink>
        <NavLink to={'/line'}className={cn(styles.profile_listEl, "text text_type_main-medium text_color_inactive")}>История заказов</NavLink>
        <NavLink to={'/'} onClick={handleLogout} className={cn(styles.profile_listEl, "text text_type_main-medium text_color_inactive")}>Выход</NavLink>
        <p className="text text_type_main-default text_color_inactive mt-15">В этом разделе вы можете
          изменить свои персональные данные</p>
      </nav>
      <div>
        <Input
          type={'text'}
          placeholder={'Имя'}
          onChange={onChange}
          value={user.name}
          name={'name'}
          error={false}
          ref={inputLoginRef}
          errorText={'Ошибка'}
          size={'default'}
          extraClass=""
          icon={'EditIcon'}
        />
        <EmailInput
          value={user.email}
          onChange={onChange}
          name={'email'}
          placeholder="E-mail"
          isIcon={false}
          icon={'EditIcon'}
          extraClass="mt-6"
        />
        <PasswordInput
          onChange={onChange}
          value={user.password}
          name={'password'}
          icon="EditIcon"
          placeholder="Пароль"
          extraClass="mt-6"
        />
        <div className={cn(styles.profile_buttons, "mt-6")}>
          <Button htmlType="button" type="secondary" size="large" onClick={handleRestore}>
            Отмена
          </Button>
          <Button htmlType="submit" type="primary" size="large">
            Сохранить
          </Button>
        </div>
      </div>
    </form>
  );
};


export default ProfilePage;