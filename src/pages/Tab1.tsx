import React, { useEffect, useState } from 'react';
import {
  IonAlert,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
  IonToast,
  useIonViewWillEnter,
} from '@ionic/react';
import './Tab1.css';
import RepoItem from '../components/RepoItem';
import LoadingSpinner from '../components/LoadingSpinner';
import { Repository } from '../interfaces/Repository';
import { deleteRepository, fetchRepositories, updateRepository } from '../services/GithubService';

const Tab1: React.FC = () => {
  const [repositoryList, setRepositoryList] = useState<Repository[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState('');
  const [toastColor, setToastColor] = useState<'success' | 'danger'>('success');
  const [showToast, setShowToast] = useState(false);
  const [showEditAlert, setShowEditAlert] = useState(false);
  const [editingRepo, setEditingRepo] = useState<Repository | null>(null);
  const [editName, setEditName] = useState('');
  const [editDescription, setEditDescription] = useState('');

  const fetchRepos = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const repos = await fetchRepositories();
      setRepositoryList(repos);
      if (!repos.length) {
        setErrorMessage('No se encontraron repositorios para mostrar.');
      }
    } catch (error) {
      console.error('Error obteniendo repositorios:', error);
      setErrorMessage('No se pudieron cargar los repositorios.');
    } finally {
      setIsLoading(false);
    }
  };

  const showFeedback = (message: string, color: 'success' | 'danger') => {
    setToastMessage(message);
    setToastColor(color);
    setShowToast(true);
  };

  const handleDelete = async (repo: Repository) => {
    const confirmed = window.confirm(`¿Eliminar repositorio ${repo.name}?`);
    if (!confirmed) {
      return;
    }

    setIsLoading(true);
    try {
      await deleteRepository(repo.owner.login, repo.name);
      showFeedback('Repositorio eliminado correctamente.', 'success');
      await fetchRepos();
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'No se pudo eliminar el repositorio.';
      console.error('Error eliminando repositorio:', error);
      showFeedback(message, 'danger');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (repo: Repository) => {
    setEditingRepo(repo);
    setEditName(repo.name);
    setEditDescription(repo.description || '');
    setShowEditAlert(true);
  };

  const handleSaveEdit = async (updatedValues: { name?: string; description?: string }) => {
    if (!editingRepo) {
      return;
    }

    const name = (updatedValues.name || '').trim();
    const description = (updatedValues.description || '').trim();

    if (!name) {
      showFeedback('El nombre del repositorio es obligatorio.', 'danger');
      return false;
    }

    if (name.length < 3) {
      showFeedback('El nombre debe tener al menos 3 caracteres.', 'danger');
      return false;
    }

    if (description.length > 200) {
      showFeedback('La descripción no puede exceder los 200 caracteres.', 'danger');
      return false;
    }

    const confirmed = window.confirm(`¿Confirmas la actualización del repositorio ${editingRepo.name}?`);
    if (!confirmed) {
      return false;
    }

    setIsLoading(true);
    try {
      await updateRepository(editingRepo.owner.login, editingRepo.name, {
        name,
        description,
      });
      showFeedback('Repositorio actualizado correctamente.', 'success');
      setShowEditAlert(false);
      await fetchRepos();
      return true;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'No se pudo actualizar el repositorio.';
      console.error('Error actualizando repositorio:', error);
      showFeedback(message, 'danger');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  useIonViewWillEnter(() => {
    fetchRepos();
  });

  useEffect(() => {
    const handleRepositoryCreated = () => fetchRepos();
    window.addEventListener('repositoryCreated', handleRepositoryCreated);
    return () => window.removeEventListener('repositoryCreated', handleRepositoryCreated);
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Repositorios</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Repositorios</IonTitle>
          </IonToolbar>
        </IonHeader>
        {isLoading ? (
          <LoadingSpinner message="Cargando repositorios..." />
        ) : errorMessage ? (
          <IonText color="danger" className="ion-padding">
            <p>{errorMessage}</p>
          </IonText>
        ) : (
          <IonList>
            {repositoryList.map((repo) => (
              <RepoItem key={repo.id} {...repo} onDelete={() => handleDelete(repo)} onEdit={() => handleEdit(repo)} />
            ))}
          </IonList>
        )}
        <IonAlert
          isOpen={showEditAlert}
          header="Editar repositorio"
          inputs={[
            {
              name: 'name',
              type: 'text',
              placeholder: 'Nombre del repositorio',
              value: editName,
            },
            {
              name: 'description',
              type: 'textarea',
              placeholder: 'Descripción',
              value: editDescription,
            },
          ]}
          buttons={[
            {
              text: 'Cancelar',
              role: 'cancel',
              handler: () => setShowEditAlert(false),
            },
            {
              text: 'Guardar',
              handler: async (values) => {
                const success = await handleSaveEdit(values);
                if (!success) {
                  return false;
                }
                setShowEditAlert(false);
              },
            },
          ]}
          onDidPresent={() => {
            setEditName(editingRepo?.name || '');
            setEditDescription(editingRepo?.description || '');
          }}
          onWillDismiss={() => {
            setShowEditAlert(false);
          }}
          onDidDismiss={() => {
            setEditingRepo(null);
          }}
          onIonInput={(event) => {
            const { name, value } = event.detail;
            if (name === 'name') {
              setEditName(value as string);
            }
            if (name === 'description') {
              setEditDescription(value as string);
            }
          }}
        />
        <IonToast
          isOpen={showToast}
          message={toastMessage}
          color={toastColor}
          duration={2000}
          onDidDismiss={() => setShowToast(false)}
        />
      </IonContent>
    </IonPage>
  );
};

export default Tab1;