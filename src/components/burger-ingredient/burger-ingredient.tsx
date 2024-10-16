import { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';
import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';
import { useSelector, useDispatch } from '../../services/store';
import { RootState } from '../../services/store';
import { addItem } from '../orderSlice';
import { v4 as uuidv4 } from 'uuid';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
    const location = useLocation();
    const dispatch = useDispatch();

    const ingredientCounts = useSelector(
      (state: RootState) => state.orders.ingredientCount
    );
    // const count =
    //   ingredientCounts && ingredientCounts[ingredient._id]
    //     ? ingredientCounts[ingredient._id]
    //     : 0;

    const handleAdd = () => {
      const ingredientWithId = {
        ...ingredient,
        id: uuidv4()
      };
      dispatch(addItem(ingredientWithId));
    };

    return (
      <BurgerIngredientUI
        ingredient={ingredient}
        count={count}
        locationState={{ background: location }}
        handleAdd={handleAdd}
      />
    );
  }
);
