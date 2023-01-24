import { connect} from 'react-redux';
import { RootState } from '../../redux/reducers/root';
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
} from '@ionic/react';
import { add, ellipsisVerticalOutline } from 'ionicons/icons';
import { useAppDispatch } from '../../redux/hooks';
import { set } from '../../redux/reducers/transactions';
import { useEffect} from 'react';
import { categories } from '../../data/transactions';
import CategoryListItem from '../../components/CategoryListItem';

const CategoriesList: React.FC<RootState> = (props) => {
  const dispacth = useAppDispatch()


  useEffect(() => {
    dispacth(set())
  }, [dispacth])

  
  const refresh = (e: CustomEvent) => {
    setTimeout(() => {
      e.detail.complete();
    }, 3000);
  };
  
  const { categories } = props.categories;

 
  return (
    <IonPage id="home-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Categories</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={refresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">
              Categories
            </IonTitle>
          </IonToolbar>
        </IonHeader>
       
        <IonList className='' id='trans-list'>
          { categories ? (
              categories.map(cat => <CategoryListItem key={cat.id} category={cat} />)
          ) : (
            <small>Aucune categorie trouve</small>
          )}
        </IonList>
        <IonFab horizontal='end'>
          <IonFabButton size='small' routerLink='/home/categories/new'>
            <IonIcon icon={add}></IonIcon>
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};


const mapState = (state:RootState) => {
  return {
    categories:state.categories
  }
}
export default connect(mapState)(CategoriesList)
