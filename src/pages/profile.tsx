import React, {FC, useCallback, useState} from 'react';
import styles from './pages.module.css'
import cn from "classnames";
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {NavLink} from "react-router-dom";
import {logoutUserRequest, updateUserRequest} from "../services/slice/userSlice";
import {useAppDispatch, useAppSelector} from "../services/hooks";
const ProfilePage: FC = () => {
  const inputLoginRef = React.useRef<HTMLInputElement>(null)
  const userData = useAppSelector(state => state.userSlice.data);
  const dispatch = useAppDispatch();
  const [user, setUser] = useState({name: userData!.name, email: userData!.email, password: ''});
  const [oldUser, setOldUser] = useState({name: userData!.name, email: userData!.email, password: ''})

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setUser({
      ...user,
      [name]: value
    })
  }

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updateUserRequest(user))
  }
  const handleRestore = (e: React.MouseEvent<HTMLDivElement>) => {
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
          isIcon={true}
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
        <div className={cn(styles.profile_buttons, "mt-6")} >
          <div onClick={handleRestore}>
            <Button htmlType="button" type="secondary" size="large">
              Отмена
            </Button>
          </div>
          <Button htmlType="submit" type="primary" size="large">
            Сохранить
          </Button>
        </div>
      </div>
    </form>
  );
};


export default ProfilePage;