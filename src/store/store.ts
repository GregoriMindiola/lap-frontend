import { configureStore } from '@reduxjs/toolkit'
import placeReducer from '../features/place/placeSlice';

export const store = configureStore({
    reducer: {
        place: placeReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch