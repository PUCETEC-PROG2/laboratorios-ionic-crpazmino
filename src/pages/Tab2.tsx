import { IonButton, IonContent, IonHeader, IonInput, IonPage, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
import './Tab2.css';
import React from 'react';

const Tab2: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Formulario de repositorio</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Formulario de repositorio</IonTitle>
          </IonToolbar>
        </IonHeader>
        
        <div className="container">
          <IonInput
            className="form-field"
            label="Nombre del repositorio"
            placeholder="Ingrese el nombre del repositorio"
            labelPlacement="floating"
          />

          <IonTextarea
            className="form-field"
            label="Descripción del repositorio"
            placeholder="Ingrese la descripción del repositorio"
            labelPlacement="floating"
            rows={4}
          />

          <IonButton
            className="save-button"
            expand="block"
            fill="solid"
          >
            Guardar
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;