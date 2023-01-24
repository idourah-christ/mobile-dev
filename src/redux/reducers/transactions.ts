import { Transaction, transactions} from "../../data/transactions";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./root";
import {Filesystem, Directory, Encoding} from '@capacitor/filesystem';
import {Capacitor} from '@capacitor/core';

export interface ActionType{
    type:string,
    payload:Transaction[]
}

interface transactionState{
    transactions:Transaction[],
    totalSum:number,
    sumWithChecked:number
}

const totalSum = (transactions:Transaction[]) => {
    let sum:number = 0;
    transactions.forEach(trans => {
        sum += trans.amount
    })
    return sum;
}
const totalSumWithChecked = (transactions:Transaction[]) =>{
    let sum:number = 0;
    transactions.forEach(trans => {
        if(trans.checked){
            sum += trans.amount;
        }
    })
    return sum;
}
const initialState: transactionState = {
    transactions:[],
    totalSum:0,
    sumWithChecked:0
}

export const transactionSlice = createSlice({
    name:"transactions",
    initialState,
    reducers:{
        set:(state) => {
            return {
                ...state,
                totalSum:totalSum(state.transactions),
                sumWithChecked:totalSumWithChecked(state.transactions)
            }
        },
        updateStatus:(state, action: PayloadAction<string>) => {
          
            state.transactions.forEach(t => {
                if(t.id === action.payload){
                    t.checked = !t.checked
                    return;
                }
            })
        
            return state;        
        },
        append:(state, action: PayloadAction<Transaction>) => {

            const transactionData = [...state.transactions, action.payload];

            const writeSecretFile = async () => {
                await Filesystem.writeFile({
                  path: 'data/db.json',
                  data: JSON.stringify(transactionData),
                  directory: Directory.Data,
                  encoding: Encoding.UTF8,
                });
              };

            return {
                ...state,
                transactions:[...state.transactions, action.payload]
            }
        },
        filter:(state, action:PayloadAction<string>) =>{
            set();
            const categoryId = action.payload;
            console.log(state.transactions)
            const trans = state.transactions.filter(trans => trans.categoryId == categoryId) 
            console.log(trans);
            return{
                ...state,
                transactions:trans,
            }


        }

    }
})

export const { set, updateStatus, append, filter } = transactionSlice.actions;

export const selectTransactions= (state:RootState) => state.transactions.transactions

export default transactionSlice.reducer;
