import React, {useState} from 'react';
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import cn from "classnames";
import styles from "./profile-edit.module.css";
import {useAppDispatch, useAppSelector} from "../../services/hooks";
import { updateUserRequest} from "../../services/slice/userSlice";

const ProfileEdit = () => {
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

  return (
    <form onSubmit={submitHandler}>
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
        onChange={onChange}
        value={user.email}
        name={'email'}
        isIcon={true}
        extraClass="mt-6"
      />
      <PasswordInput
        onChange={onChange}
        value={user.password}
        name={'password'}
        icon="EditIcon"
        placeholder="Пароль"
        extraClass="mt-6 "
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
    </form>
  );
};

export default ProfileEdit;