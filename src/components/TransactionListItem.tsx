import { 
    IonLabel, 
    IonItem, 
    IonNote,
    IonCheckbox,
    IonRow,
    IonCol,
    IonGrid,
    IonInput,
    IonContent,
    IonIcon,
    IonModal,
    IonToolbar,
    IonButton,
    IonButtons,
    IonTitle,
    IonHeader
} from "@ionic/react";

import { useRef, useState } from "react";
import { man, trash,eye, pencilSharp} from 'ionicons/icons';
import { Transaction, getTransaction } from "../data/transactions";
import './TransactionListItem.css';
import { useAppDispatch } from "../redux/hooks";
import { updateStatus } from "../redux/reducers/transactions";
import { OverlayEventDetail } from '@ionic/core/components';
interface TransactionListItemProps{
    transaction:Transaction;
}

const noteColor = (type:number) => {
    return type < 0 ? 'withdraw-color':'deposite-color';
    
}

const TransactionListItem: React.FC<TransactionListItemProps>=({transaction}) => {
    const dispacth = useAppDispatch();

    const [message, setMessage] = useState(
        'This modal example uses triggers to automatically open a modal when the button is clicked.'
      );

    const handleClick = (event:any) => {
        const transId = event.target.dataset.id;
        dispacth(updateStatus(transId))
    }
    function onWillDismiss(ev: CustomEvent<OverlayEventDetail>) {
        if (ev.detail.role === 'confirm') {
          setMessage(`Hello, ${ev.detail.data}!`);
        }
      }
    const modal = useRef<HTMLIonModalElement>(null);
    const input = useRef<HTMLIonInputElement>(null);
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
            <div className='d-flex justify-content-between card-footer'>
                    <IonButton id="open-modal" expand="block">
                        <IonIcon data-toggle="modal" data-target="#exampleModal" icon={eye}/>
                    </IonButton>
                   
                    <IonIcon id="edit" icon={pencilSharp}/>
                    <IonIcon id="delete" icon={trash}/>
            </div>
            <IonContent>
            <IonModal ref={modal} trigger="open-modal" onWillDismiss={(ev) => onWillDismiss(ev)}>
                <IonHeader>
                    <IonToolbar>
                    <IonButtons slot="start">
                        <IonButton  onClick={() => modal.current?.dismiss()}>Cancel</IonButton>  
                    </IonButtons>
                </IonToolbar>
                </IonHeader>
                <IonContent className="ion-padding">
                    <img src={transaction.image}/>
                </IonContent>
            </IonModal>
            </IonContent>
            
           
        </div>
    )

}

export default TransactionListItem;