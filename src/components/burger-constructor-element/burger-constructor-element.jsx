import React, {useRef} from 'react';
import cn from "classnames";
import styles from "../burger-constructor/burger-constructor.module.css";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {constructorSort, deleteItem} from "../../services/actions/constructor-action";
import {useDispatch, useSelector} from "react-redux";
import {useDrag, useDrop} from "react-dnd";
import PropTypes from "prop-types";
import Modal from "../modal/modal";
import {ingredientPropType} from "../../utils/prop-types";

const BurgerConstructorElement = ({item, index}) => {
  const dispatch = useDispatch();

  const ref = useRef(null);


  const [{handlerId}, drop] = useDrop({
    accept: 'SORT_INGREDIENT',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index
      if (dragIndex === hoverIndex) {
        return
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }

      dispatch(constructorSort(dragIndex, hoverIndex))
      item.index = hoverIndex
    }
  })
  const [{isDragging}, drag] = useDrag({
    type: 'SORT_INGREDIENT',
    item: () => {
      return {item, index}
    },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  })
  const opacity = isDragging ? 0 : 1;
  drag(drop(ref))
  return (
      <li ref={ref} style={{opacity}} className={cn(styles.burger__item, 'mb-4 mr-2 ml-4')} >
        <DragIcon type="primary" />
        <ConstructorElement
          text={item.name}
          thumbnail={item.image}
          price={item.price}
          handleClose={() => dispatch(deleteItem(index))}/>
      </li>
  );
};
BurgerConstructorElement.propTypes = {
  item: ingredientPropType,
  index: PropTypes.number
}
export default BurgerConstructorElement;