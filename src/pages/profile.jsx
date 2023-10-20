import React, {useState} from 'react';
import styles from './pages.module.css'
import cn from "classnames";
import {EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
const ProfilePage = () => {
  const [valueLogin, setValueLogin] = React.useState('');
  const inputLoginRef = React.useRef(null)
  const [valueEmail, setValueEmail] = useState('')
  const onChange = e => {
    setValueEmail(e.target.value)
  }
  const [valuePassword, setValuePassword] = useState('')
  const onChangePassword = e => {
    setValuePassword(e.target.value)
  }
  return (
    <div className={cn(styles.profile_wrapper)}>
      <ul className={cn(styles.profile_list)}>
        <li className={cn(styles.profile_listEl, "text text_type_main-medium")}>Профиль</li>
        <li className={cn(styles.profile_listEl, "text text_type_main-medium text_color_inactive")}>История заказов</li>
        <li className={cn(styles.profile_listEl, "text text_type_main-medium text_color_inactive")}>Выход</li>
        <li className="text text_type_main-default text_color_inactive mt-10">В этом разделе вы можете
          изменить свои персональные данные</li>
      </ul>
      <div>
        <Input
          type={'text'}
          placeholder={'Имя'}
          onChange={e => setValueLogin(e.target.value)}
          value={valueLogin}
          name={'name'}
          error={false}
          ref={inputLoginRef}
          errorText={'Ошибка'}
          size={'default'}
          extraClass=""
          icon={'EditIcon'}
        />
        <EmailInput
          value={valueEmail}
          onChange={onChange}
          name={'Логин'}
          placeholder="E-mail"
          isIcon={false}
          icon={'EditIcon'}
          extraClass="mt-6"
        />
        <PasswordInput
          value={valuePassword}
          onChange={onChangePassword}
          name={'password'}
          icon="EditIcon"
          placeholder="Пароль"
          extraClass="mt-6"
        />
      </div>
    </div>
  );
};

export default ProfilePage;