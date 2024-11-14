import {
    configureStore,
    combineReducers
  } from '@reduxjs/toolkit';

import taskSlice from '../slice/TaskSlice';

import {
useDispatch as dispatchHook,
useSelector as selectorHook
} from 'react-redux';

const rootReducer = combineReducers({
    tasks: taskSlice.reducer,

});

export const store = configureStore({
    reducer: rootReducer,
    // devTools: process.env.NODE_ENV !== 'production'
});

export default store

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch = dispatchHook.withTypes<AppDispatch>();
export const useSelector = selectorHook.withTypes<RootState>();