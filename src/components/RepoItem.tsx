import './RepoItem.css';
import React from 'react';
import {
  IonItemSliding,
  IonItem,
  IonThumbnail,
  IonLabel,
  IonItemOptions,
  IonItemOption,
  IonIcon
} from '@ionic/react';
import { pencil, trash } from 'ionicons/icons';
import { Repository } from '../interfaces/Repository';

interface RepoItemProps extends Repository {
  onEdit?: () => void;
  onDelete?: () => void;
}

const RepoItem: React.FC<RepoItemProps> = ({ name, description, language, owner, onEdit, onDelete }) => {
  return (
    <IonItemSliding>
      <IonItem>
        <IonThumbnail slot="start">
          <img src={owner.avatar_url} alt="Avatar" />
        </IonThumbnail>
        <IonLabel>
          <h2>{name}</h2>
          <p>{description}</p>
          <p><strong>Lenguaje:</strong> {language}</p>
        </IonLabel>
      </IonItem>

      <IonItemOptions>
        <IonItemOption onClick={onEdit}>
          <IonIcon icon={pencil} slot="icon-only" />
        </IonItemOption>
        <IonItemOption color="danger" onClick={onDelete}>
          <IonIcon icon={trash} slot="icon-only" />
        </IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
  );
};

export default RepoItem;