import React from 'react';
import {Link} from "react-router-dom";
import {Button} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './not-found.module.css'
import cn from 'classnames';

const NotFoundPage = () => {
  return (
    <div className={cn(styles.notfound_wrapper)}>
      <h2 className="text text_type_main-large">Страница не найдена</h2>
      <Link to={"/"}>
        <Button htmlType="button" type="primary" size="large">
          На главную страницу
        </Button>
      </Link>
    </div>
  );
};

export default NotFoundPage;