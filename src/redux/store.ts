import { configureStore } from '@reduxjs/toolkit';
import websiteReducer from './reducers/website';

const store = configureStore({
    reducer: {
        website: websiteReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>

export default store;
