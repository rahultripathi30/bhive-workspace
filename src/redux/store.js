// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import centersReducer from './centersSlice';

const store = configureStore({
  reducer: {
    centers: centersReducer,
  },
});

export default store;
