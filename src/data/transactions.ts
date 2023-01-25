export interface Transaction{
    id:string,
    title:string,
    date:string,
    amount:number,
    checked:boolean,
    type:string,
    categoryId:string,
    image:string
}
export interface Category{
    id:string,
    name:string
}
export interface TransactionType{
    id:number,
    name:string
}

export const types: TransactionType[] = [
    {
        id:1,
        name:"Virement"
    },
    { 
        id:2,
        name:"Retrait"
    }
]
export const categories:Category[] = [
    {
        id:"1",
        name:"Restaurant"
    },
    {
        id:"2",
        name:"Achat vetements et Shopping"
    },
    {
        id:"3",
        name:"Provision alimentaires"
    }

]
export const transactions: Transaction[] =[
    {
        id:"3",
        title:"Salaire mois de janvier",
        amount:1650.80,
        checked:true,
        type:"1",
        date:"17/01/2023",
        categoryId:"2",
        image:''
    }
    // {
    //     id:"2",
    //     title:"Course debut de mois",
    //     amount:-250.0,
    //     checked:false,
    //     type:"2",
    //     date:"5/01/2023"
    // },
    // {
    //     id:"4",
    //     title:"Achat d'un nouveau telephone portable",
    //     amount:-650.0,
    //     checked:false,
    //     type:"2",
    //     date:"5/01/2023"
    // },
    // {
    //     id:"5",
    //     title:"Achat d'un nouveau telephone portable",
    //     amount:-450.0,
    //     checked:false,
    //     type:"2",
    //     date:"5/01/2023"
    // }

]

export const getTransactions = () => transactions;

export const getTransactionSum = () => {
    let sum: number = 0;
    transactions.forEach(t => {
        sum += t.amount;
    })
    return sum;
}
export const getCheckedTransactionSum = () => {
    let sum: number = 0;
    transactions.forEach(t => {
        if(t.checked){
            sum += t.amount;
        }
    })
    return sum;
}
export const getTransaction = (id:string) => transactions.find(trans => trans.id === id)
