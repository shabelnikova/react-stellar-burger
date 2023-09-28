import {BurgerIcon, Logo, ListIcon, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './app-header.module.css'
import cn from 'classnames';
const AppHeader = () => {
  return (
    <header className={cn(styles.header)}>
      <nav className={cn(styles.nav)}>
        <div className={cn(styles.link__wrapper)}>
          <a href="#" className={cn(styles.link, styles.link_active, 'text text_type_main-default pt-4 pr-5 pb-4')}>
            <BurgerIcon type={"primary"}/>
            <span>Конструктор</span>
          </a>
          <a href="#" className={cn(styles.link, 'text text_type_main-default pt-4 pb-4')}>
            <ListIcon type={"secondary"}/>
            <span>Лента заказов</span>
          </a>
        </div>
        <div className={cn(styles.header__logo)}>
          <Logo/>
        </div>
        <div className={cn(styles.header__link_right)}>
          <a href="#" className={cn(styles.link, 'text text_type_main-default pt-4 pb-4')}>
            <ProfileIcon type={"secondary"}/>
            <span>Личный кабинет</span>
          </a>
        </div>
      </nav>
    </header>
  )
}
export default AppHeader;