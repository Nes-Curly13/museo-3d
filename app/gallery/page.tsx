"use client"

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ModelViewer from '@/components/ModelViewer';
import Image from 'next/image';


type Object3D = {
  id: number;
  title: string;
  artist: string;
  year: number;
  description: string;
  modelUrl: string;
  thumbnail: string;
  type: 'glb' | 'gltf';
};

const objects3D: Object3D[] = [
  {
    id: 1,
    title: "Modelo Ordoñes",
    artist: "ordoñez",
    year: 2023,
    description: "Un elemento artesanal tipo vasija de la epoca precolombina.",
    modelUrl: "https://my3dmuseum.s3.us-east-1.amazonaws.com/modeloordonez.glb",
    thumbnail: "/images/modeloordonez.png",
    type: 'gltf'
  },
  {
    id: 2,
    title: "Modelo Chaguezac",
    artist: "Khronos Group",
    year: 2023,
    description: "Un elemento artesanal tipo jarron de la epoca precolombina.",
    modelUrl: "https://my3dmuseum.s3.us-east-1.amazonaws.com/modelochaguezac.glb",
    thumbnail: "/images/modelochaguezac.png",
    type: 'gltf'
  },
  {
    id: 3,
    title: "Modelo Hurtado",
    artist: "Khronos Group",
    year: 2023,
    description: "Un elemento artesanal tipo recipiente de la epoca precolombina.",
    modelUrl: "https://my3dmuseum.s3.us-east-1.amazonaws.com/modelohurtado.glb",
    thumbnail: "/images/modelohurtado.png",
    type: 'gltf'
  },
  {
    id: 4,
    title: "Modelo Molina",
    artist: "Khronos Group",
    year: 2023,
    description: "Un elemento artesanal tipo vaso de la epoca precolombina.",
    modelUrl: "https://my3dmuseum.s3.us-east-1.amazonaws.com/modelomolina.glb",
    thumbnail: "/images/modelomolina.png",
    type: 'gltf'
  },
  {
    id: 5,
    title: "Modelo Abadia",
    artist: "Khronos Group",
    year: 2023,
    description: "Un elemento artesanal tipo jarra de la epoca precolombina.",
    modelUrl: "https://my3dmuseum.s3.us-east-1.amazonaws.com/modeloabadia.glb",
    thumbnail: "/images/modelo_abadia_sarria.png",
    type: 'gltf'
  }
];


export default function Gallery() {
  const [selectedObject, setSelectedObject] = useState<Object3D | null>(null);
  
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Galería de museo 3D</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {objects3D.map((object) => (
          <Card key={object.id} className="overflow-hidden">
            <CardContent className="p-0 relative h-48">
              <Image
                src={object.thumbnail}
                alt={object.title}
                fill
                className="object-cover"
              />
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <span className="font-semibold">{object.title}</span>
              <Button onClick={() => setSelectedObject(object)}>Ver Modelo</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      {selectedObject && (
        <Dialog open={!!selectedObject} onOpenChange={() => setSelectedObject(null)}>
          <DialogContent className="sm:max-w-[900px]">
            <DialogHeader>
              <DialogTitle>{selectedObject.title}</DialogTitle>
              <DialogDescription>{selectedObject.artist}, {selectedObject.year}</DialogDescription>
            </DialogHeader>
            <div className="h-[60vh] mb-4">
              <ModelViewer modelUrl={selectedObject.modelUrl} modelType={selectedObject.type} />
            </div>
            <p>{selectedObject.description}</p>
          </DialogContent>
        </Dialog>
      )}
      <div className="mt-8 text-center">
        <Link href="/">
          <Button variant="outline">Regresar a inicio</Button>
        </Link>
      </div>
    </div>
  );
}
