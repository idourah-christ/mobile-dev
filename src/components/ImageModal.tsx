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
    IonHeader,
    useIonViewWillEnter,
} from "@ionic/react";

import { useEffect, useRef, useState } from "react";
import { man, trash,eye, pencilSharp} from 'ionicons/icons';
import { Transaction, getTransaction } from "../data/transactions";
import './TransactionListItem.css';
import { OverlayEventDetail } from '@ionic/core/components';
import { connect } from "react-redux";
import { RootState } from "../redux/reducers/root";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

const ImageModal: React.FC =() => {
    const params = useParams<{ transId: string }>();
    
    return (
        <IonContent>
         mfffkfkfk
        </IonContent>
    );
  };
  const mapState = (state:RootState) => {
    return {
      transactions:state.transactions
    }
  }
  export default connect(mapState)(ImageModal);