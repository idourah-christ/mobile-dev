import { Category, Transaction, categories} from "../../data/transactions";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./root";

export interface ActionType{
    type:string,
    payload:Transaction[]
}

export interface CategoryState{
    categories:Category[],
}

const initialState: CategoryState = {
    categories:categories,
}

export const categorySlice = createSlice({
    name:"categories",
    initialState,
    reducers:{
        set:(state) => state,

        append:(state, action: PayloadAction<Category>) => {
            return {
                ...state,
                categories:[...state.categories, action.payload]
            }
        }

    }
})

export const { set, append } = categorySlice.actions;

export default categorySlice.reducer;
