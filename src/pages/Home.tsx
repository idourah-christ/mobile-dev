import { connect} from 'react-redux';
import { RootState } from '../redux/reducers/root';
import { Redirect, Route } from 'react-router-dom'
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonLabel,
  IonRouterOutlet,
  IonIcon
} from '@ionic/react';
import {home} from 'ionicons/icons'
import './Home.css';
import { useAppDispatch } from '../redux/hooks';
import { set } from '../redux/reducers/transactions';
import { useEffect} from 'react';
import { IonReactRouter } from '@ionic/react-router';
import TransactionList from './TransactionList';
import CategoriesList from './categories/CategoriesList';
import AddTransaction from './AddTransaction';
import AddCategory from './categories/AddCategory';
import ViewCategory from './categories/ViewCategory';


const Home: React.FC<RootState> = (props) => {
  const dispacth = useAppDispatch()


  useEffect(() => {
    dispacth(set())
  }, [props.transactions.transactions])

  
  const refresh = (e: CustomEvent) => {
    setTimeout(() => {
      e.detail.complete();
    }, 3000);
  };
  
  
  return (
    <IonPage id="home-page">
      <IonContent fullscreen>
        <IonReactRouter>
          <IonTabs>
            <IonRouterOutlet>
              <Redirect exact path="/home" to="/home/transactions" />
              <Route exact path="/home/transactions" component={TransactionList}/>
              <Route exact path="/home/transactions/new" component={AddTransaction}/>

              <Route exact path='/home/categories' component={CategoriesList} />
              <Route exact path="/home/categories/new" component={AddCategory} />
              <Route exact path="/home/categories/:categoryId/transactions" component={ViewCategory}/>
              
             
            </IonRouterOutlet>
          <IonTabBar slot='bottom'>
              <IonTabButton tab="transactions" href="/home/transactions">
              <IonIcon size='small' icon={home}></IonIcon>
              </IonTabButton>

              <IonTabButton tab="categories" href='/home/categories'>
                <IonLabel>Categories</IonLabel>
              </IonTabButton>
          </IonTabBar>
          </IonTabs>
        </IonReactRouter>
      </IonContent>
    </IonPage>
  );
};


const mapState = (state:RootState) => {
  return {
    transactions:state.transactions,
    categories:state.categories
  }
}
export default connect(mapState)(Home)
