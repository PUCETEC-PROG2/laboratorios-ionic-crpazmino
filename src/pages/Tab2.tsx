import { useState } from 'react';
import { IonButton, IonContent, IonHeader, IonInput, IonPage, IonText, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
import LoadingSpinner from '../components/LoadingSpinner';
import { createRepository } from '../services/GithubService';
import './Tab2.css';

const Tab2: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSave = async () => {
    if (!name.trim()) {
      setErrorMessage('El nombre del repositorio es obligatorio.');
      return;
    }

    setLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      await createRepository({
        name: name.trim(),
        description: description.trim(),
      });
      setSuccessMessage('Repositorio creado correctamente.');
      setName('');
      setDescription('');
    } catch (error) {
      setErrorMessage('No se pudo crear el repositorio.');
    } finally {
      setLoading(false);
    }
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
              {errorMessage && (
                <IonText color="danger" className="ion-padding-bottom">
                  <p>{errorMessage}</p>
                </IonText>
              )}
              {successMessage && (
                <IonText color="success" className="ion-padding-bottom">
                  <p>{successMessage}</p>
                </IonText>
              )}
              <IonInput
                className="form-field"
                label="Nombre del repositorio"
                placeholder="Ingrese el nombre del repositorio"
                labelPlacement="floating"
                value={name}
                onIonInput={(e) => setName(e.detail.value ?? '')}
              />
              <IonTextarea
                className="form-field"
                label="Descripcion"
                placeholder="Ingrese la descripcion del repositorio"
                labelPlacement="floating"
                rows={4}
                value={description}
                onIonInput={(e) => setDescription(e.detail.value ?? '')}
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