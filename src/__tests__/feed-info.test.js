import feedReducer, { getAllFeeds } from '../components/feedSlice';

describe('feedSlice reducer', () => {
  let initialState;

  beforeEach(() => {
    initialState = {
      orders: [],
      total: 0,
      totalToday: 0,
      isLoading: true,
      error: undefined
    };
  });

  it('should set isLoading to true when fetching feeds is pending', () => {
    const action = { type: getAllFeeds.pending.type };
    const newState = feedReducer(initialState, action);

    expect(newState.isLoading).toBe(true);
    expect(newState.error).toBeUndefined();
  });

  it('should handle successful fetching of feeds', () => {
    const feedsData = {
      orders: [
        { id: 1, name: 'Feed 1' },
        { id: 2, name: 'Feed 2' }
      ],
      total: 2,
      totalToday: 1
    };
    const action = { type: getAllFeeds.fulfilled.type, payload: feedsData };
    const newState = feedReducer(initialState, action);

    expect(newState.orders).toEqual(feedsData.orders);
    expect(newState.total).toBe(feedsData.total);
    expect(newState.totalToday).toBe(feedsData.totalToday);
    expect(newState.isLoading).toBe(false);
    expect(newState.error).toBeUndefined();
  });

  it('should handle failed fetching of feeds', () => {
    const action = {
      type: getAllFeeds.rejected.type,
      error: { message: 'Fetch failed' }
    };
    const newState = feedReducer(initialState, action);

    expect(newState.orders).toEqual([]);
    expect(newState.total).toBe(0);
    expect(newState.totalToday).toBe(0);
    expect(newState.isLoading).toBe(false);
    expect(newState.error).toBe('Fetch failed');
  });
});
