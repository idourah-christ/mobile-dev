import { 
    IonLabel, 
    IonItem, 
    IonNote,
    IonCheckbox,
    IonRow,
    IonCol,
    IonGrid,
    IonContent,
    IonIcon
} from "@ionic/react";

import { man, trash, pencil, eye, pencilSharp} from 'ionicons/icons';
import { Transaction, getTransaction } from "../data/transactions";
import './TransactionListItem.css';
import { useAppDispatch } from "../redux/hooks";
import { updateStatus } from "../redux/reducers/transactions";

interface TransactionListItemProps{
    transaction:Transaction;
}

const noteColor = (type:number) => {
    return type < 0 ? 'withdraw-color':'deposite-color';
    
}

const TransactionListItem: React.FC<TransactionListItemProps>=({transaction}) => {
    const dispacth = useAppDispatch();

    const handleClick = (event:any) => {
        const transId = event.target.dataset.id;
        dispacth(updateStatus(transId))
    }

    return(
        <div className="list-item-card card border-info" data-toggle="collapse" aria-expanded="false" aria-controls="collapseFooter">
            <div className='card-body'>
                <div className='container-fluid'>
                    <div className='d-flex'>
                        <div className='col' id='icon-container'>
                            <IonLabel>
                                <IonIcon icon={man} className='icons'/>
                            </IonLabel>
                        </div>
                        <div className='col-9'>
                            <IonLabel className='card-title'>
                                <p>{ transaction.title}</p>
                            </IonLabel>
                           
                            <small className={'amount '+ noteColor(transaction.amount)} >{transaction.amount}</small>
                        </div>
                        <div className='col-1'>
                            <IonCheckbox className='trans-checkbox' data-id={transaction.id} checked={transaction.checked} onClick={handleClick} />
                        </div>
                    </div>
                </div> 
                
            </div>
            <div className='d-flex justify-content-between card-footer' id="collapseFooter">
                    <IonIcon id="view" icon={eye}/>
                    <IonIcon id="edit" icon={pencilSharp}/>
                    <IonIcon id="delete" icon={trash}/>
            </div>
           
        </div>
    )

}

export default TransactionListItem;