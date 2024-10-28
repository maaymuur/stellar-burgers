import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../components/rootReducer';

describe('rootReducer initiate', () => {
  it('initializes the state correctly', () => {
    const store = configureStore({ reducer: rootReducer });
    const initAction = { type: '@@INIT' };
    const initialState = store.getState();
    const state = rootReducer(undefined, initAction);
    expect(state).toEqual(initialState);
  });
});
