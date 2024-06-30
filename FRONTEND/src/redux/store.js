import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import recordReducer from './slices/recordSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    record: recordReducer,
  },
});

export default store;
