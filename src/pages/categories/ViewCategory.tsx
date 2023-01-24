import { useEffect, useState } from 'react';
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonButton,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
  IonPage,
  IonToolbar,
  IonTitle,
  IonPopover,

  useIonViewWillEnter,
} from '@ionic/react';
import { personCircle } from 'ionicons/icons';
import { useParams } from 'react-router';
import { filter } from '../../redux/reducers/transactions';
import { useAppDispatch } from '../../redux/hooks';
import { connect } from 'react-redux';
import { RooState } from '../../redux/store';
import { Transaction } from '../../data/transactions';
import TransactionListItem from '../../components/TransactionListItem';
import { add, ellipsisVerticalOutline } from 'ionicons/icons';
import { IonGrid,IonRow, IonCol } from '@ionic/react';
import "./ViewCategory.css"

function ViewCategory(props:RooState) {

  const params = useParams<{ categoryId: string }>();
 
  const {transactions} = props.transactions;

  const filtered = transactions.filter(trans => trans.categoryId === params.categoryId)
  
  const handleClick = (event:any) => {

  }
  return (
    <IonPage id="view-message-page">
       <IonHeader translucent>
        <IonToolbar>
            <IonGrid fixed>
                <IonRow>
                    <IonCol> <IonButton size='small'>Edit</IonButton></IonCol>
                    <IonCol offset='6'>
                        <IonButton size='small' color='danger'>Delete</IonButton>
                    </IonCol>
                </IonRow>
            </IonGrid>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonList>
            { filtered.length? (
                filtered.map(trans => <TransactionListItem key={trans.id} transaction={trans} /> )
            ) : 
            (
                <div className='container mt-3'>
                    <div className='alert alert-info'>
                        <small className='text-muted'>
                            Aucune transaction pour cette categorie
                        </small>
                    </div>
                </div>
            ) }
        </IonList>
      </IonContent>
    </IonPage>
  );
}

const mapState = (state:RooState) => ({
    transactions:state.transactions
})
export default connect(mapState)(ViewCategory);
