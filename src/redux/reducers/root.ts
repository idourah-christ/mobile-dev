import { combineReducers } from "@reduxjs/toolkit";
import { categorySlice } from "./categories";
import transactionReducer from "./transactions";
import categoryReducer from './categories'



const rootReducer = combineReducers({
    transactions:transactionReducer,
    categories:categoryReducer
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer;