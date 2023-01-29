import { Transaction} from "../../data/transactions";
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "./root";
import {Filesystem, Directory, Encoding} from '@capacitor/filesystem';
import {Capacitor} from '@capacitor/core';

export interface ActionType{
    type:string,
    payload:Transaction[]
}

interface transactionState{
    transactions:Transaction[],
}

export const fetchTransactions = createAsyncThunk("transactions/fetchTransactions", async() => {
    return await Filesystem.readFile({
        path:'data/db.json',
        directory:Directory.Documents
    }).then(response => response.data)
})

export const saveTransactions = createAsyncThunk("transactions/post",async(transactions:Transaction) =>{

    return await Filesystem.writeFile({
        path:'data/db.json',
        data:JSON.stringify(transactions),
        directory:Directory.Documents,
        encoding:Encoding.UTF8
    })
})

export const total = (transactions:Transaction[]) => {
    let sum = 0.0;
    if(!transactions.length){
      return sum;
    }
    transactions.forEach(trans => {
      sum += trans.amount;
    })
    return sum;
}
const initialState: transactionState = {
    transactions:[],
}

export const transactionSlice = createSlice({
    name:"transactions",
    initialState,
    extraReducers:(builder) =>{
        builder.addCase(fetchTransactions.fulfilled, (state, action) =>{
     
        return{
            ...state,
            transactions:JSON.parse(action.payload),
           } 
        })
    },
    reducers:{
        updateStatus:(state, action: PayloadAction<string>) => {
            state.transactions.forEach(t => {
                if(t.id === action.payload){
                    t.checked = !t.checked
                    return;
                }
            })
            const save = async() =>{
                await Filesystem.writeFile({
                    path:'data/db.json',
                    data:JSON.stringify(state.transactions),
                    directory:Directory.Documents,
                    encoding:Encoding.UTF8
                })
            }
            save();
            return state;        
        },
        deleteTransaction:(state, action:PayloadAction<string>) => {

            const transactionsList = state.transactions.filter(t => t.id !== action.payload);

            const save = async () => {
                await Filesystem.writeFile({
                    path:'data/db.json',
                    data:JSON.stringify(transactionsList),
                    directory:Directory.Documents,
                    encoding:Encoding.UTF8
                })
            }

            save()
            return {
                ...state,
                transactions:transactionsList
            }
        },
        append:(state, action: PayloadAction<Transaction>) => {

            const data = [...state.transactions, action.payload];

            const save = async () => {
                await Filesystem.writeFile({
                  path: 'data/db.json',
                  data: JSON.stringify(data),
                  directory: Directory.Documents,
                  encoding: Encoding.UTF8,
                });
              };
            
            save().then(response => {
                console.log(response)
            });

            return {
                ...state,
                transactions:[...state.transactions, action.payload]
            }
        },
        filter:(state, action:PayloadAction<string>) =>{
        
            const categoryId = action.payload;
            const trans = state.transactions.filter(trans => trans.categoryId == categoryId) 
            console.log(trans);
            return{
                ...state,
                transactions:trans,
            }


        }

    }
})

export const { updateStatus, append, filter, deleteTransaction } = transactionSlice.actions;

export const selectTransactions= (state:RootState) => state.transactions.transactions

export default transactionSlice.reducer;
