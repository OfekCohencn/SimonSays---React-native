
import { configureStore } from '@reduxjs/toolkit';
import GameSlice from './reducers';

export const store = configureStore(
{
    reducer: {
        game: GameSlice
    }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;