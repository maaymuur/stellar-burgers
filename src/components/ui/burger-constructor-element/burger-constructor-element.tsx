import React, { FC, memo } from 'react';
import styles from './burger-constructor-element.module.css';
import {
  ConstructorElement,
  MoveButton
} from '@zlden/react-developer-burger-ui-components';
import { deleteItem } from '../../orderSlice';
import { BurgerConstructorElementUIProps } from './type';
import { useDispatch, useSelector } from '../../../services/store';

export const BurgerConstructorElementUI: FC<BurgerConstructorElementUIProps> =
  memo(({ ingredient, index, totalItems, handleMoveUp, handleMoveDown }) => {
    const dispatch = useDispatch();

    const handleClose = () => {
      dispatch(deleteItem(ingredient));
    };

    return (
      <li className={`${styles.element} mb-4 mr-2`}>
        <MoveButton
          handleMoveDown={handleMoveDown}
          handleMoveUp={handleMoveUp}
          isUpDisabled={index === 0}
          isDownDisabled={index === totalItems - 1}
        />
        <div className={`${styles.element_fullwidth} ml-2`}>
          <ConstructorElement
            text={ingredient.name}
            price={ingredient.price}
            thumbnail={ingredient.image}
            handleClose={handleClose}
          />
        </div>
      </li>
    );
  });
