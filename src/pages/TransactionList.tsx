import TransactionListItem from '../components/TransactionListItem';
import { connect} from 'react-redux';
import { RootState } from '../redux/reducers/root';
import { Link, Route } from 'react-router-dom'
import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar,
  IonFab,IonFabButton,IonIcon,
  IonAccordionGroup,
  useIonAlert,
  IonInput,
  IonButton
} from '@ionic/react';
import { add, search, ellipsisVertical} from 'ionicons/icons';
import './Home.css';
import { useAppDispatch } from '../redux/hooks';
import { fetchTransactions, total } from '../redux/reducers/transactions';
import { useEffect, useState} from 'react';
import './TransactionList.css';



const TransactionList: React.FC<RootState> = (props) => {
  const dispacth = useAppDispatch();


  const [presentAlert] = useIonAlert();

  const [handleMessage, setHandlerMessage] = useState('');

  const [roleMessage, setRoleMessage] = useState('');


  useEffect(() => {
    dispacth(fetchTransactions())
  }, [])

  
  const refresh = (e: CustomEvent) => {
    setTimeout(() => {
      e.detail.complete();
    }, 3000);
  };
  
  const { transactions} = props.transactions;
  
  
  
  const totalWithChecked = () =>{
    const transList = transactions.filter(trans => trans.checked)
    return total(transList);
  }
  return (
    <IonPage id="home-page">
      <IonHeader>
       <div className='col-1'>
          <IonIcon icon={search} className='search-icon'/>
        </div>
       <div className='col-10 d-flex text-center'><IonInput placeholder='Chercher une transaction...'/></div>
       <div className='col-1'><IonIcon className='ellipse-icon' icon={ellipsisVertical} /></div>
      </IonHeader>
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={refresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">
              Transactions
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className='sold-card'>
          <div className='card-body d-flex justify-content-between'>
            <h2 className='sold-label'>
                <span className='sum' id='current-sum'>{total(transactions).toFixed(2)}</span>
              </h2>
            <h2 className='sold-label'>
                <span className='sum' id='actual-sum'>{totalWithChecked().toFixed(2)}</span>
              </h2>
          </div>
        </div>
        <p className='date'>aujourd'hui</p>
        <IonList>
           <IonAccordionGroup>
           {transactions && transactions.map(t => <TransactionListItem key={t.id} transaction={t} />)}
           </IonAccordionGroup>
        </IonList>
        <IonFab horizontal='end'>
          <IonFabButton size='small' routerLink='/home/transactions/new'>
            <IonIcon icon={add}></IonIcon>
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};


const mapState = (state:RootState) => {
  return {
    transactions:state.transactions
  }
}
export default connect(mapState)(TransactionList)
