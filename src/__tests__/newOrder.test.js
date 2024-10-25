import newOrderSlice, { newOrder, resetOrder } from '../components/newOrder';

describe('newOrderSlice reducer', () => {
  let initialState;

  beforeEach(() => {
    initialState = {
      loading: false,
      order: null,
      error: undefined
    };
  });

  it('should set loading to true when creating an order is pending', () => {
    const action = { type: newOrder.pending.type };
    const newState = newOrderSlice.reducer(initialState, action);

    expect(newState.loading).toBe(true);
    expect(newState.order).toBeNull();
    expect(newState.error).toBeUndefined();
  });

  it('should handle successful order creation', () => {
    const orderData = { order: { id: 1, name: 'Burger' } };
    const action = { type: newOrder.fulfilled.type, payload: orderData };
    const newState = newOrderSlice.reducer(initialState, action);

    expect(newState.loading).toBe(false);
    expect(newState.order).toEqual(orderData.order);
    expect(newState.error).toBeUndefined();
  });

  it('should handle failed order creation', () => {
    const action = {
      type: newOrder.rejected.type,
      error: { message: 'Order creation failed' }
    };
    const newState = newOrderSlice.reducer(initialState, action);

    expect(newState.loading).toBe(false);
    expect(newState.order).toBeNull();
    expect(newState.error).toBe('Order creation failed');
  });

  it('should reset state when resetOrder is dispatched', () => {
    const modifiedState = {
      loading: true,
      order: { id: 1, name: 'Burger' },
      error: 'Some error message'
    };

    const action = resetOrder();
    const newState = newOrderSlice.reducer(modifiedState, action);

    expect(newState).toEqual(initialState);
  });
});
