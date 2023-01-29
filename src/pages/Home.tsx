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
import { useEffect} from 'react';
import { IonReactRouter } from '@ionic/react-router';
import TransactionList from './TransactionList';
import CategoriesList from './categories/CategoriesList';
import AddTransaction from './AddTransaction';
import AddCategory from './categories/AddCategory';
import ViewCategory from './categories/ViewCategory';
import ImageModal from '../components/ImageModal';


const Home: React.FC = () => {
  
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
              
              <Route exact path="/home" component={TransactionList}/>
              <Route exact path="/home/transactions/new" component={AddTransaction}/>
             
            
              <Route exact path='/home/categories' component={CategoriesList} />
              <Route exact path="/home/categories/new" component={AddCategory} />
              <Route exact path="/home/categories/:categoryId/transactions" component={ViewCategory}/>
        
            </IonRouterOutlet>
            <IonTabBar slot='bottom'>
              <IonTabButton tab="transactions" href="/home">
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


export default Home;
