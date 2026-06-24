import React, { useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from '@ionic/react';
import './Tab1.css';
import RepoItem from '../components/RepoItem';
import LoadingSpinner from '../components/LoadingSpinner';
import { Repository } from '../interfaces/Repository';
import { fetchRepositories } from '../services/GithubService';

const Tab1: React.FC = () => {
  const [repositoryList, setRepositoryList] = useState<Repository[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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

  useIonViewWillEnter(() => {
    fetchRepos();
  });

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
              <RepoItem key={repo.name} {...repo} />
            ))}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Tab1;