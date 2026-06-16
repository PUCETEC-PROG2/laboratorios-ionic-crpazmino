import { IonCard, IonCardContent, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Tab3.css';

const Tab3: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Perfil de usuario</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Perfil de usuario</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className="container">
          <IonCard className="card">
            <img
              src="https://avatars.githubusercontent.com/u/173958328?v=4"
              alt="Foto de perfil"
            />
            <IonCardTitle>Carlos Pazmino Zambrano</IonCardTitle>
            <IonCardSubtitle>crpazmino@puce.edu.ec</IonCardSubtitle>
            <IonCardContent>
              <p>Desarrollador de software formado en la Pontificia Universidad Católica del Ecuador.</p>
              <p>Si deseas contactarme, buscarme buscame en google</p>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;