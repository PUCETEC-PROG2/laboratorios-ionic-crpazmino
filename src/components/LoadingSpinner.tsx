import React from 'react';
import { IonSpinner, IonText } from '@ionic/react';

interface LoadingSpinnerProps {
  message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ message = 'Cargando...' }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <IonSpinner name="crescent" />
      <IonText color="medium" style={{ marginTop: '8px' }}>
        <p>{message}</p>
      </IonText>
    </div>
  );
};

export default LoadingSpinner;
