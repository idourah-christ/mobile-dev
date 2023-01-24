import { 
    IonLabel, 
    IonItem, 
} from "@ionic/react";

import { Category } from "../data/transactions";
import './TransactionListItem.css';

interface CategoryListItemProps{
    category:Category;
}

const CategoryListItem: React.FC<CategoryListItemProps>=({category}) => {

    return(
        <IonItem routerLink={`/home/categories/${category.id}/transactions`} detail={true}>
            <div slot="start" className='dot dot-unread'></div>
            <IonLabel className='ion-text-wrap'>
                <h2>
                    {category.name}
                </h2>
            </IonLabel>
        </IonItem>
    )

}

export default CategoryListItem;