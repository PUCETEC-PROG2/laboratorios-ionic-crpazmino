import { useState } from 'react';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonText,
  IonTextarea,
  IonTitle,
  IonToast,
  IonToolbar,
  useIonRouter,
} from '@ionic/react';
import LoadingSpinner from '../components/LoadingSpinner';
import { createRepository } from '../services/GithubService';
import './Tab2.css';

const Tab2: React.FC = () => {
  const router = useIonRouter();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastColor, setToastColor] = useState<'success' | 'danger'>('success');

  const showMessage = (message: string, color: 'success' | 'danger' = 'success') => {
    setToastMessage(message);
    setToastColor(color);
    setShowToast(true);
  };

  const handleSave = async () => {
    const repositoryName = name.trim();
    const repositoryDescription = description.trim();

    if (!repositoryName) {
      setErrorMessage('El nombre del repositorio es obligatorio.');
      return;
    }

    if (repositoryName.length < 3) {
      setErrorMessage('El nombre debe tener al menos 3 caracteres.');
      return;
    }

    if (repositoryDescription.length > 200) {
      setErrorMessage('La descripción no puede exceder los 200 caracteres.');
      return;
    }

    setLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      await createRepository({
        name: repositoryName,
        description: repositoryDescription,
      });

      setSuccessMessage('Repositorio creado correctamente.');
      showMessage('Repositorio creado correctamente.', 'success');
      setName('');
      setDescription('');
      window.dispatchEvent(new Event('repositoryCreated'));

      setTimeout(() => {
        router.push('/tab1', 'root');
      }, 1200);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'No se pudo crear el repositorio.';
      setErrorMessage(message);
      showMessage(message, 'danger');
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
            <IonList>
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

              <IonItem lines="full">
                <IonLabel position="floating">Nombre del repositorio</IonLabel>
                <IonInput
                  value={name}
                  placeholder="Ingrese el nombre del repositorio"
                  onIonInput={(e) => setName(e.detail.value ?? '')}
                />
              </IonItem>

              <IonItem lines="full">
                <IonLabel position="floating">Descripción</IonLabel>
                <IonTextarea
                  rows={4}
                  value={description}
                  placeholder="Ingrese la descripción del repositorio"
                  onIonInput={(e) => setDescription(e.detail.value ?? '')}
                />
              </IonItem>

              <IonButton className="form-field" expand="block" fill="solid" onClick={handleSave} disabled={loading}>
                Guardar
              </IonButton>
            </IonList>
          )}
        </div>

        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          color={toastColor}
          duration={2000}
        />
      </IonContent>
    </IonPage>
  );
};

export default Tab2;