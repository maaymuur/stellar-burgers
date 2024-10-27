import ordersListSlice, { getUserOrders, initialState } from '../components/ordersListSlice';

describe('ordersListSlice reducer', () => {

  it('should set loading to true when fetching orders is pending', () => {
    const action = { type: getUserOrders.pending.type };
    const newState = ordersListSlice.reducer(initialState, action);

    expect(newState.loading).toBe(true);
  });

  it('should handle successful fetching of orders', () => {
    const ordersData = [
      { id: 1, name: 'Order 1' },
      { id: 2, name: 'Order 2' }
    ];
    const action = { type: getUserOrders.fulfilled.type, payload: ordersData };
    const newState = ordersListSlice.reducer(initialState, action);

    expect(newState.orders).toEqual(ordersData);
    expect(newState.loading).toBe(false);
  });

  it('should handle failed fetching of orders', () => {
    const action = { type: getUserOrders.rejected.type };
    const newState = ordersListSlice.reducer(initialState, action);

    expect(newState.loading).toBe(false);
  });
});
