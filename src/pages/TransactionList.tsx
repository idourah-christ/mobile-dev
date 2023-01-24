import TransactionListItem from '../components/TransactionListItem';
import { connect} from 'react-redux';
import { RootState } from '../redux/reducers/root';
import { Route } from 'react-router-dom'
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
  IonTab,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonLabel,
  IonRouterOutlet
} from '@ionic/react';
import { add } from 'ionicons/icons';
import './Home.css';
import { useAppDispatch } from '../redux/hooks';
import { set } from '../redux/reducers/transactions';
import { useEffect} from 'react';
import './TransactionList.css';

const TransactionList: React.FC<RootState> = (props) => {
  const dispacth = useAppDispatch()

  // useIonViewWillEnter(() => {
   
  // });
  useEffect(() => {
    dispacth(set())
  }, [props.transactions.transactions])

  
  const refresh = (e: CustomEvent) => {
    setTimeout(() => {
      e.detail.complete();
    }, 3000);
  };
  
  const { transactions, totalSum, sumWithChecked} = props.transactions;

 
  return (
    <IonPage id="home-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Transactions</IonTitle>
        </IonToolbar>
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
        <div className='alert-info alert mb-4' id='sold-container'>
          <div className='card-body d-flex justify-content-between'>
            <h2 className='sold-label'>
                <small className='text-muted'>sold</small>
                <span className='text-primary'>{totalSum.toFixed(2)}</span>
              </h2>
            <h2 className='sold-label'>
                <small className='text-muted'>sold</small>
                <span className='text-success'>{sumWithChecked.toFixed(2)}</span>
              </h2>
          </div>
        </div>

        <IonList className='' id='trans-list'>
          {transactions.map(t => <TransactionListItem key={t.id} transaction={t} />)}
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
