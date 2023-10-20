import React, {useState} from 'react';
import cn from 'classnames';
import styles from './pages.module.css'
import {Button, EmailInput, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
const LoginPage = () => {
  const [userData, setUserData] = useState({});
  const dispatch = useDispatch()
  const onChange = e => {
    const {name, value} = e.target;
    setUserData({
      ...userData,
      [name]: value
    })
  }
  const handleSubmit = e => {
    e.preventDefault();
    const {email, password} = userData;
    if(!email || !password) {
      return;
    }
    // dispatch()
  }
  return (
    <form className={cn(styles.form_wrapper)} onSubmit={handleSubmit}>
      <h2 className="text text_type_main-medium">Вход</h2>
      <EmailInput
        value={userData.email || ''}
        onChange={onChange}
        name={'email'}
        placeholder="E-mail"
        isIcon={false}
        extraClass="mt-6"
      />
      <PasswordInput
        value={userData.password || ''}
        onChange={onChange}
        name={'password'}
        placeholder="Пароль"
        extraClass="mt-6"
        />
      <Button htmlType="submit" type="primary" size="large" extraClass="mt-6 mb-20">
        Войти
      </Button>
      <div className={cn(styles.login_redirect, 'mb-4')}>
        <p className="text text_type_main-default text_color_inactive">Вы — новый пользователь?</p>
        <Link to={"/register"}>
          <Button htmlType="button" type="secondary" size="medium" extraClass='pl-2 ' style={{paddingTop: 0, paddingBottom: 0, paddingRight: 0 }}>
            Зарегистрироваться
          </Button>
        </Link>
      </div>
      <div className={cn(styles.login_redirect)}>
        <p className="text text_type_main-default text_color_inactive">Забыли пароль?</p>
        <Link to={"/forgot-password"}>
          <Button htmlType="button" type="secondary" size="medium" extraClass='pl-2 ' style={{paddingTop: 0, paddingBottom: 0, paddingRight: 0 }}>
            Восстановить пароль
          </Button>
        </Link>
      </div>
    </form>
  );
};

export default LoginPage;