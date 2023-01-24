import { 
    IonLabel, 
    IonItem, 
    IonNote,
    IonCheckbox
} from "@ionic/react";

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
        <IonItem>
            <div slot="start" className='dot dot-unread'></div>
            <IonLabel className='ion-text-wrap'>
                <h2>
                    {transaction.title}
                </h2>
                <h3 className='text-muted'>{transaction.date}</h3>
                <h3> 
                    <span className='amount'>
                        <IonNote className={noteColor(transaction.amount)}>{transaction.amount}</IonNote>
                    </span>
                </h3>
            </IonLabel>
            <IonCheckbox data-id={transaction.id} checked={transaction.checked} onClick={handleClick} />
        </IonItem>
    )

}

export default TransactionListItem;