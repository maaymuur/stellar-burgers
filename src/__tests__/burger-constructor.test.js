import orderSlice, {
  addItem,
  deleteItem,
  moveItem
} from '../components/orderSlice';
import { TConstructorIngredient } from '@utils-types';

describe('orderSlice reducer', () => {
  let initialState;

  beforeEach(() => {
    initialState = {
      bun: null,
      ingredients: []
    };
  });

  it('should handle adding a non-bun ingredient', () => {
    const action = addItem({
      name: 'Ingredient 1',
      type: 'sauce',
      price: 10
    });

    const newState = orderSlice.reducer(initialState, action);

    expect(newState.ingredients).toHaveLength(1);
    expect(newState.ingredients[0]).toMatchObject({
      name: 'Ingredient 1',
      type: 'sauce',
      price: 10
    });
  });

  it('should handle adding a bun ingredient', () => {
    const action = addItem({
      name: 'Bun 1',
      type: 'bun',
      price: 15
    });

    const newState = orderSlice.reducer(initialState, action);

    expect(newState.bun).toMatchObject({
      name: 'Bun 1',
      type: 'bun',
      price: 15
    });
  });

  it('should handle removeFromConstructor action', () => {
    const initialState = {
      bun: null,
      ingredients: [{ id: '1', name: 'Ingredient 1', type: 'sauce', price: 10 }]
    };

    const newState = orderSlice.reducer(initialState, deleteItem({ id: '1' }));
    expect(newState.ingredients).toHaveLength(0);
  });

  it('should handle reorderConstructor action', () => {
    const initialState = {
      bun: null,
      ingredients: [
        { id: '1', name: 'Ingredient 1', type: 'sauce', price: 10 },
        { id: '2', name: 'Ingredient 2', type: 'main', price: 20 }
      ]
    };

    const newState = orderSlice.reducer(
      initialState,
      moveItem({ fromIndex: 0, toIndex: 1 })
    );

    expect(newState.ingredients).toEqual([
      { id: '2', name: 'Ingredient 2', type: 'main', price: 20 },
      { id: '1', name: 'Ingredient 1', type: 'sauce', price: 10 }
    ]);
  });
});
