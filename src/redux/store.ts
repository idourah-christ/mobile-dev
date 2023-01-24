import {configureStore, Store} from '@reduxjs/toolkit';
import rootReducer from './reducers/root'


const state = {

}
const store = configureStore({reducer:rootReducer})

export type RooState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch;

export default store;