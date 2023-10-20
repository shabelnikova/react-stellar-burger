import {BurgerIcon, Logo, ListIcon, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './app-header.module.css'
import cn from 'classnames';
import {NavLink, useMatch} from "react-router-dom";
const AppHeader = () => {
  const isConstructor = useMatch( "/");
  const isLine = useMatch( "/line" );
  const isProfile = useMatch({ path: "/login" });
  return (
    <header className={cn(styles.header)}>
      <nav className={cn(styles.nav)}>
        <div className={cn(styles.link__wrapper)}>
          <NavLink to={"/"} className={({isActive}) =>
            isActive ? cn(styles.link, styles.link_active, 'text text_type_main-default pt-4 pr-5 pb-4')
              : cn(styles.link, 'text text_type_main-default pt-4 pr-5 pb-4')} >

            <BurgerIcon type={isConstructor ? "primary" : "secondary"}/>
            <span>Конструктор</span>
          </NavLink>
          <NavLink to={'/line'} className={({isActive}) =>
            isActive ? cn(styles.link, styles.link_active, 'text text_type_main-default pt-4 pr-5 pb-4')
              : cn(styles.link, 'text text_type_main-default pt-4 pr-5 pb-4')}>
            <ListIcon type={isLine ? "primary" : "secondary"}/>
            <span>Лента заказов</span>
          </NavLink>
        </div>
        <div className={cn(styles.header__logo)}>
          <Logo/>
        </div>
        <div className={cn(styles.header__link_right)}>
          <NavLink  to={"/login"} className={({isActive}) =>
            isActive ? cn(styles.link, styles.link_active, 'text text_type_main-default pt-4 pr-5 pb-4')
              : cn(styles.link, 'text text_type_main-default pt-4 pr-5 pb-4')}>
            <ProfileIcon type={isProfile? "primary" : "secondary"}/>
            <span>Личный кабинет</span>
          </NavLink>
        </div>
      </nav>
    </header>
  )
}
export default AppHeader;