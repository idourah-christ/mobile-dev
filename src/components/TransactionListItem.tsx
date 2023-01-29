import { 
    IonLabel, 
    IonCheckbox,
    IonIcon,
    IonButton,
    IonAccordion,
    useIonAlert,
    IonItem
} from "@ionic/react";

import { man, trash,eye, pencilSharp} from 'ionicons/icons';
import { Transaction} from "../data/transactions";
import { useAppDispatch } from "../redux/hooks";
import { updateStatus } from "../redux/reducers/transactions";
import './TransactionListItem.css';
import { useState } from "react";
import { deleteTransaction } from "../redux/reducers/transactions";




interface TransactionListItemProps{
    transaction:Transaction;
}



const TransactionListItem: React.FC<TransactionListItemProps>=({transaction}) => {
    
    const dispacth = useAppDispatch();

    const [presentAlert] = useIonAlert();

    const [handlerMessage, setHandlerMessage] = useState('');

    const [roleMessage, setRoleMessage] = useState('');

    const handleClick = (event:any) => {
        const transId = event.target.dataset.id;
        dispacth(updateStatus(transId))
    }


    const noteColor = (type:number) => {
        return type < 0 ? 'withdraw-color':'deposite-color';
        
    }
   
    return(
      
            <div className="list-item-card card" data-toggle="collapse" aria-expanded="false" aria-controls="collapseFooter">
                <IonAccordion>
                    <div slot="header" className='card-body'>
                        <div className='d-flex'>
                            <div className='col' id='icon-container'>
                                <IonLabel>
                                    <IonIcon icon={man} className='icons'/>
                                </IonLabel>
                            </div>
                            <div className='col-9'>
                                <IonLabel className='card-title'>
                                    { transaction.title}
                                </IonLabel>
                            </div>
                            <div className='col-1'>
                                <IonCheckbox className='trans-checkbox' data-id={transaction.id} checked={transaction.checked} onClick={handleClick} />
                            </div>
                        </div>
                    </div>
                    <div className='d-flex justify-content-between card-footer' slot="content">
                        <IonButton data-id={transaction.id} className='card-btn'
                            onClick={() => presentAlert({
                                header:'transaction detail',
                                message:`<p>amount: ${transaction.amount}</p> 
                                         <p>date: ${transaction.date}</p>
                                         <img src=${transaction.image}/>`,
                                buttons:[
                                    {
                                        text:'fermer'
                                    }
                                ]
                            })}
                        >
                            <IonIcon icon={eye}/>
                        </IonButton>
                        <IonButton className='card-btn'>
                            <IonIcon icon={pencilSharp}/>
                        </IonButton>
                        
                        <IonButton className='card-btn' color='danger'
                            onClick={() => presentAlert({
                                header: `suppression`,
                                message: `Supprimer ${transaction.title} ?`,
                                cssClass:'custom-alert',
                                buttons:[
                                {
                                    text:'Cancel',
                                    role:'cancel',
                                    cssClass:'alert-button-cancel',
                                    handler: () =>{
                                        setHandlerMessage('Alert canceled');
                                    },
                                },
                                {
                                    text:'Ok',
                                    role:'confirm',
                                    cssClass:'alert-button-confirm',
                                    handler: () => {
                                        dispacth(deleteTransaction(transaction.id))
                                    },
                                },
                                ],
                                onDidDismiss:(e: CustomEvent) => setRoleMessage(`Dismissed with role: ${e.detail.role}`)
                            }
                            )}
                            >
                            <IonIcon icon={trash}/>
                        </IonButton>
                    </div>
                </IonAccordion>
            </div>
     
    )

}

export default TransactionListItem;