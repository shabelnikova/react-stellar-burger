import {BurgerIcon, Logo, ListIcon, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './app-header.module.css'
import cn from 'classnames';
import {NavLink, useMatch} from "react-router-dom";
import {FC} from "react";
const AppHeader: FC = () => {
  const isConstructor = useMatch( "/");
  const isFeed = useMatch( "/feed" );
  const isProfile = useMatch("/profile" );
interface INavLink {
  isActive: boolean
  isPending?: boolean
  isTransitioning?: boolean
}

  const setClassName = ({isActive} : INavLink) => {
    return cn(styles.link, { [styles.link_active]: isActive}, 'text text_type_main-default pt-4 pr-5 pb-4')
  }
  return (
    <header className={cn(styles.header)}>
      <nav className={cn(styles.nav)}>
        <div className={cn(styles.link__wrapper)}>
          <NavLink to={"/"} className={setClassName} >
            <BurgerIcon type={isConstructor ? "primary" : "secondary"}/>
            <span>Конструктор</span>
          </NavLink>
          <NavLink to={'/feed'} className={setClassName}>
            <ListIcon type={isFeed ? "primary" : "secondary"}/>
            <span>Лента заказов</span>
          </NavLink>
        </div>
        <NavLink to={'/'} className={cn(styles.header__logo)}>
          <div >
            <Logo/>
          </div>
        </NavLink>
        <div className={cn(styles.header__link_right)}>
          <NavLink  to={"/profile"} className={setClassName}>
            <ProfileIcon type={isProfile? "primary" : "secondary"}/>
            <span>Личный кабинет</span>
          </NavLink>
        </div>
      </nav>
    </header>
  )
}
export default AppHeader;