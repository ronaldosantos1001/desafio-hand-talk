// /src/hooks/useConfiguration.ts

import { useEffect, useState } from 'react';
import { ShapeType, UserConfiguration } from './configuration.types';
import { getDatabase, ref, onValue, set, off } from 'firebase/database';
import { database } from '@/services/firebase';

const defaultConfiguration: UserConfiguration = {
  cone: { type: 'cone', color: '#FF0000', rotation: { x: 0.5, y: 0.2, z: 0 } },
  cube: { type: 'cube', color: '#00FF00', rotation: { x: 0.5, y: 0.2, z: 0 } },
  dodecahedron: { type: 'dodecahedron', color: '#0000FF', rotation: { x: 0.5, y: 0.2, z: 0 } }
};

export function useConfiguration(userId: string) {
  const [config, setConfig] = useState<UserConfiguration>(defaultConfiguration);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const db = getDatabase();
    const configRef = ref(db, `configurations/${userId}`);

    // Configura o listener para alterações em tempo real
    const unsubscribe = onValue(configRef, (snapshot) => {
      if (snapshot.exists()) {
        setConfig(snapshot.val());
      } else {
        // Se a configuração não existe, podemos optar por criar o registro padrão ou manter o default
        set(ref(db, `configurations/${userId}`), defaultConfiguration)
          .then(() => setConfig(defaultConfiguration))
          .catch((error) => console.error('Erro ao salvar configurações padrão:', error));
      }
      setLoading(false);
    }, (error) => {
      console.error('Erro ao buscar configurações:', error);
      setLoading(false);
    });

    // Cleanup: remove o ouvinte quando o componente for desmontado ou o userId mudar
    return () => {
      off(configRef);
    };
  }, [userId]);

  async function updateObjectConfig(objectKey: ShapeType, newConfig: Partial<UserConfiguration[ShapeType]>) {
    const updatedObject = {
      ...config[objectKey],
      ...newConfig,
    };

    const updatedConfig = {
      ...config,
      [objectKey]: updatedObject,
    };

    try {
      await set(ref(getDatabase(), `configurations/${userId}`), updatedConfig);
    } catch (error) {
      console.error('Erro ao salvar configurações:', error);
    }
  }

  return {
    config,
    loading,
    updateObjectConfig,
  };
}
