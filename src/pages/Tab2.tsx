import { useState } from 'react';
import { IonButton, IonContent, IonHeader, IonInput, IonPage, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
import LoadingSpinner from '../components/LoadingSpinner';
import './Tab2.css';

const Tab2: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Formulario de Repositorio</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Formulario de Repositorio</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className="form-container">
          {loading ? (
            <LoadingSpinner message="Guardando repositorio..." />
          ) : (
            <>
              <IonInput
                className="form-field"
                label="Nombre del repositorio"
                placeholder="Ingrese el nombre del repositorio"
                labelPlacement="floating"
              />
              <IonTextarea
                className="form-field"
                label="Descripcion"
                placeholder="Ingrese la descripcion del repositorio"
                labelPlacement="floating"
                rows={4}
              />
              <IonButton className="form-field" expand="block" fill="solid" onClick={handleSave}>
                Guardar
              </IonButton>
            </>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;