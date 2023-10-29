import React, {useEffect, useState} from 'react';
import styles from './pages.module.css'
import cn from "classnames";
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import {registerUserRequest} from "../services/slice/userSlice";


const RegisterPage = () => {


  const dispatch = useDispatch();
  const userData = useSelector(state => state.userSlice)
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const onChange = e => {
    const {name, value} = e.target
    setUser({
      ...user,
      [name]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const {name, password, email} = user;
    if(!name || !password || !email)
      return;
    dispatch(registerUserRequest({name, email, password}));

  }

  useEffect(()=>{
    if(userData.success) {
      // setAccessToken(userData.accessToken);
      // setRefreshToken(userData.refreshToken);
      navigate('/')
    }
    console.log(userData)
  }, [userData])

  return (
    <form className={cn(styles.form_wrapper)} onSubmit={handleSubmit}>
      <h2 className="text text_type_main-medium">Регистрация</h2>
      <Input
        type={'text'}
        placeholder={'Имя'}
        onChange={onChange}
        value={user.name || ''}
        name={'name'}
        error={false}
        errorText={'Ошибка'}
        size={'default'}
        extraClass="mt-6"
      />
      <EmailInput
        value={user.email || ''}
        onChange={onChange}
        name={'email'}
        placeholder="E-mail"
        isIcon={false}
        extraClass="mt-6"
      />
      <PasswordInput
        value={user.password || ''}
        onChange={onChange}
        name={'password'}
        placeholder="Пароль"
        extraClass="mt-6"
      />
      <Button htmlType="submit" type="primary" size="large" extraClass="mt-6 mb-20">
        Зарегистрироваться
      </Button>
      <div className={cn(styles.login_redirect, 'mb-4')}>
        <p className="text text_type_main-default text_color_inactive">Уже зарегистрированы?</p>
        <Link to={"/login"}>
          <Button htmlType="button" type="secondary" size="medium" extraClass='pl-2 ' style={{paddingTop: 0, paddingBottom: 0, paddingRight: 0 }}>
            Войти
          </Button>
        </Link>
      </div>

    </form>
  );
};

export default RegisterPage;