import React, {useEffect, useState} from 'react';
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import cn from "classnames";
import styles from "./pages.module.css";
import {Link, useNavigate} from "react-router-dom";
import {resetPasswordRequest} from "../services/slice/userSlice";
import {useDispatch, useSelector} from "react-redux";

const ResetPasswordPage = () => {
  const [passwordReset, setPasswordReset] = useState({});
  const isPasswordChanged = useSelector(state => state.userSlice.passwordReset);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onChange = e => {
    const {name, value} = e.target
    setPasswordReset({
      ...passwordReset,
      [name]: value
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPasswordRequest(passwordReset));
  }
  useEffect(() => {
    if(isPasswordChanged)
      navigate('/login');
  }, [isPasswordChanged])
  return (
    <form className={cn(styles.form_wrapper)} onSubmit={handleSubmit}>
      <h2 className="text text_type_main-medium">Восстановление пароля</h2>
      <PasswordInput
        value={passwordReset.password || ''}
        onChange={onChange}
        name={'password'}
        placeholder="Введите новый пароль"
        extraClass="mt-6"
      />
      <Input
        type={'text'}
        placeholder={'Введите код из письма'}
        onChange={onChange}
        value={passwordReset.token || ''}
        name={'token'}
        error={false}
        errorText={'Ошибка'}
        size={'default'}
        extraClass="mt-6"
      />
      <Button htmlType="submit" type="primary" size="large" extraClass="mt-6 mb-20">
        Сохранить
      </Button>
      <div className={cn(styles.login_redirect)}>
        <p className="text text_type_main-default text_color_inactive">Вспомнили пароль?</p>
        <Link to={"/login"}>
          <Button htmlType="button" type="secondary" size="medium" extraClass='pl-2 ' style={{paddingTop: 0, paddingBottom: 0, paddingRight: 0 }}>
            Войти
          </Button>
        </Link>
      </div>
    </form>
  );
};

export default ResetPasswordPage;