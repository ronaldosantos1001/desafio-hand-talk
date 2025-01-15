

import { Header } from "@/components/header";
import { RenderScene } from "@/components/renderScene";
import { useAuthContext } from "@/hooks/useAuth";
import { ObjectConfiguration } from "@/screens/configuration/configuration.types";
import { useConfiguration } from "@/screens/configuration/useConfiguration";
import React, { useEffect, useState } from "react";
import {  View  } from "react-native";


export default function Index() {
   const { user } = useAuthContext();
   
   const userId = user?.uid
   const { config, loading } = useConfiguration(userId ?? "");
   const [objects, setObjects] = useState<ObjectConfiguration[]>([]);

   
   useEffect(() => {
    let isMounted = true;
  
    if (!loading && config && isMounted) {
      const newObjects = Object.keys(config)
        .map(key => config[key as keyof typeof config])
        .filter((item): item is NonNullable<typeof item> => item !== undefined);
  
      const transformedObjects = newObjects.map(item => ({
        type: item.type,
        color: item.color ?? "#FFFFFF",
        rotation: {
          x: item.rotation?.x ?? 0,
          y: item.rotation?.y ?? 0,
          z: item.rotation?.z ?? 0,
        },
      }));
  
      setObjects(transformedObjects);
    }
  
    return () => {
      isMounted = false;
    };
  }, [loading, config]);
  
  


  return (
    <View style={{ flex: 1, backgroundColor: "#202020",}}>
      <Header email={user?.email ?? ""}/>
      <RenderScene objects={objects} />
    </View>

  );
}