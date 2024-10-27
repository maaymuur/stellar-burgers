import userSlice, { register, login, apiGetUser, updateUser, initialState } from '../components/userSlice';

describe('userSlice reducer', () => {
  
  it('should set isLoading to true when registration is pending', () => {
    const action = { type: register.pending.type };
    const newState = userSlice.reducer(initialState, action);

    expect(newState.isAuthChecked).toBe(false);
    expect(newState.error).toBeUndefined();
  });

  it('should handle successful registration', () => {
    const userData = { user: { email: 'test@example.com', name: 'Test User' } };
    const action = { type: register.fulfilled.type, payload: userData };
    const newState = userSlice.reducer(initialState, action);

    expect(newState.isAuthChecked).toBe(true);
    expect(newState.user).toEqual(userData.user);
    expect(newState.error).toBeUndefined();
  });

  it('should handle failed registration', () => {
    const action = { type: register.rejected.type, error: { message: 'Registration failed' } };
    const newState = userSlice.reducer(initialState, action);

    expect(newState.error).toBe('Registration failed');
  });

  it('should set isLoading to true when login is pending', () => {
    const action = { type: login.pending.type };
    const newState = userSlice.reducer(initialState, action);

    expect(newState.isAuthChecked).toBe(false);
    expect(newState.error).toBeUndefined();
  });

  it('should handle successful login', () => {
    const userData = { user: { email: 'test@example.com', name: 'Test User' } };
    const action = { type: login.fulfilled.type, payload: userData };
    const newState = userSlice.reducer(initialState, action);

    expect(newState.isAuthChecked).toBe(true);
    expect(newState.user).toEqual(userData.user);
    expect(newState.error).toBeUndefined();
  });

  it('should handle failed login', () => {
    const action = { type: login.rejected.type, error: { message: 'Login failed' } };
    const newState = userSlice.reducer(initialState, action);

    expect(newState.isAuthChecked).toBe(false);
    expect(newState.error).toBe('Login failed');
  });

  it('should handle fetching user data', () => {
    const userData = { user: { email: 'test@example.com', name: 'Test User' } };
    const action = { type: apiGetUser.fulfilled.type, payload: userData };
    const newState = userSlice.reducer(initialState, action);

    expect(newState.isAuthChecked).toBe(true);
    expect(newState.user).toEqual(userData.user);
  });

  it('should handle failed fetching user data', () => {
    const action = { type: apiGetUser.rejected.type, error: { message: 'Failed to fetch user' } };
    const newState = userSlice.reducer(initialState, action);

    expect(newState.isAuthChecked).toBe(false);
    expect(newState.error).toBe('Failed to fetch user');
  });

  it('should handle user update', () => {
    const userData = { user: { email: 'updated@example.com', name: 'Updated User' } };
    const action = { type: updateUser.fulfilled.type, payload: userData };
    const newState = userSlice.reducer(initialState, action);

    expect(newState.isAuthChecked).toBe(true);
    expect(newState.user).toEqual(userData.user);
  });

  it('should handle failed user update', () => {
    const action = { type: updateUser.rejected.type, error: { message: 'Update failed' } };
    const newState = userSlice.reducer(initialState, action);

    expect(newState.isAuthChecked).toBe(false);
    expect(newState.error).toBe('Update failed');
  });
});
