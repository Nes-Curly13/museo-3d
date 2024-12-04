"use client"
import { useEffect } from 'react';

export default function Pruebas() {
  useEffect(() => {
    const fetchModelo3D = async () => {
      try {
        const url = 'https://iiacmynqkndqtccxwenk.supabase.co/storage/v1/object/public/3dModels/modelohurtado.gltf';
        
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`Error al cargar el modelo: ${response.statusText}`);
        }

        const modelo3D = await response.json(); // Si es JSON, de lo contrario usa response.text() para texto plano
        console.log(modelo3D);  // Muestra el contenido en la consola
        
      } catch (error) {
        console.error('Error al cargar el modelo 3D:', error);
      }
    };

    fetchModelo3D();
  }, []);

  return <div>Cargando modelo 3D...</div>;
}


