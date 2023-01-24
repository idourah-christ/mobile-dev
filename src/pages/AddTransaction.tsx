import { 
    IonPage,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonContent,
    IonList,
    IonInput,
    IonLabel,
    IonItem,
    IonButton,
    IonSelect,
    IonSelectOption,
    useIonViewWillEnter
 } from "@ionic/react";
 import './AddTransactions.css';
 import { useEffect, useState } from "react";
 import { types } from "../data/transactions";
 import { Transaction } from "../data/transactions";
 import { useAppDispatch } from "../redux/hooks";
 import { append } from "../redux/reducers/transactions";
import { useHistory } from "react-router";
import { RooState } from "../redux/store";
import { set } from "../redux/reducers/categories";
import { connect } from "react-redux";
 

const AddTransaction: React.FC<RooState> = (props) => {
    const dispatch = useAppDispatch();
    const history = useHistory()

    useEffect(() => {
        dispatch(set())
    }, [dispatch, props.categories])

    const [state, setState] = useState({
        title:'',
        amount:'',
        type:'',
        date:'',
        categoryId:''
    })

    const handleChange = (event:any) => {
        setState({
            ...state,
            [event.target.name]:event.target.value
        })
    }
    const handleSubmit = (event:any) =>{
        event.preventDefault();

        event.target.reset();

        const {v4:uuidv4} = require("uuid")

        const amount = state.type == "2"? parseFloat(state.amount) * -1: parseFloat(state.amount)

        const trans:Transaction = {
            id:uuidv4(),
            title:state.title,
            amount:amount,
            date:state.date,
            type:state.type,
            checked:false,
            categoryId:state.categoryId
        }
        dispatch(append(trans));
        history.push('/home/transactions')
    }

    const {categories} = props.categories;

    return(
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                    <IonBackButton text="Transactions" defaultHref="/home"></IonBackButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>

            <IonContent>
                <div className="container pt-3">
                    <form onSubmit={handleSubmit}>
                        <IonList>
                            <IonItem className="group-form mt-2">
                                <IonInput name="title" type="text" onIonChange={handleChange} value={state.title}
                                placeholder="Intitule de la transaction"></IonInput>
                            </IonItem>

                            <IonItem className='group-form mt-2'>
                                <IonInput name='amount' type='number' onIonChange={handleChange} value={state.amount}
                                placeholder="Montant"></IonInput>
                            </IonItem>

                            <IonItem className='group-form mt-2'>
                                <IonSelect interface="action-sheet" placeholder="nature" onIonChange={handleChange} name="type" value={state.type}>
                                    {types.map(t => (
                                         <IonSelectOption key={t.id} value={t.id}>{t.name}</IonSelectOption>
                                    ))}
                                </IonSelect>
                            </IonItem>

                            <IonItem className='group-form mt-2'>
                                <IonSelect interface="action-sheet" placeholder="Categorie" onIonChange={handleChange} name="categoryId" value={state.categoryId}>
                                    {categories.map(cat => (
                                        <IonSelectOption key={cat.id} value={cat.id}>{cat.name}</IonSelectOption>
                                    ))}
        
                                </IonSelect>
                            </IonItem>

                            <IonItem className='group-form mt-2'>
                                <IonInput type='date' onIonChange={handleChange} name="date" value={state.date}></IonInput>
                            </IonItem>
                            <div className='mt-2'>
                                <IonButton type='submit'>
                                    <IonLabel>Ajouter</IonLabel>
                                </IonButton>
                            </div>
                        </IonList>
                    </form>
                </div>
            </IonContent>
        </IonPage>
    )
}

const mapState = (state:RooState) => ({
    categories:state.categories,
    transactions:state.transactions
})
export default connect(mapState)(AddTransaction);