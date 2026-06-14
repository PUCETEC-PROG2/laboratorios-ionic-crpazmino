import { IonContent, IonHeader, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import RepoItem from '../components/RepoItem';
import { repositoryList } from '../Interfaces/Repository';
import './Tab1.css';

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Repositorios</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonHeader collapse="condense">
        <IonToolbar>
          <IonTitle size="large">Repositorios</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {repositoryList.map((repository, index) => (
            <RepoItem key={index} {...repository} />
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;


