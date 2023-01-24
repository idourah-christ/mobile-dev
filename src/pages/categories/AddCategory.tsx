import { 
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonInput,
    IonLabel,
    IonItem,
    IonButton,
 } from "@ionic/react";

import { useState } from "react";
import { Category } from "../../data/transactions";
import { useHistory } from "react-router";
import { useAppDispatch } from "../../redux/hooks";
import { append } from "../../redux/reducers/categories";
 

const AddCategory: React.FC = () => {
    const dispatch = useAppDispatch();
    const history = useHistory()

    const [state, setState] = useState({
        name:'',
    })

    const handleChange = (event:any) => {
        setState({
            ...state,
            [event.target.name]:event.target.value
        })
    }
    const handleSubmit = (event:any) =>{
        event.preventDefault();

        event.target.reset();

        const {v4:uuidv4} = require("uuid")

        const category:Category = {
            id:uuidv4(),
            name:state.name
        }
        dispatch(append(category))
        history.push('/home/categories')

    }
    return(
        <IonPage>
           <IonHeader translucent>
                <IonToolbar>
                    <IonTitle>Nouvelle categorie</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent>
                <div className="container pt-3">
                    <form onSubmit={handleSubmit}>
                        <IonList>
                            <IonItem className="group-form mt-2">
                                <IonInput name="name" type="text" onIonChange={handleChange} value={state.name}
                                placeholder="Nom de la categorie"></IonInput>
                            </IonItem>

                            <div className='mt-2'>
                                <IonButton type='submit'>
                                    <IonLabel>Ajouter</IonLabel>
                                </IonButton>
                            </div>
                        </IonList>
                    </form>
                </div>
            </IonContent>
        </IonPage>
    )
}

export default AddCategory;