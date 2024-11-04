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
    title: "modelo 1",
    artist: "ordoñez",
    year: 2023,
    description: "A simple animated cube demonstrating basic glTF animation capabilities.",
    modelUrl: "https://raw.githubusercontent.com/Nes-Curly13/modelos3d_MuseoUV/main/Modelos%203D/modelo_vasija/untitled1.gltf",
    thumbnail: "https://source.unsplash.com/random/300x300?cube",
    type: 'gltf'
  },
  {
    id: 2,
    title: "Carbon Fibre",
    artist: "Khronos Group",
    year: 2023,
    description: "A model showcasing carbon fibre material properties in glTF.",
    modelUrl: "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/main/2.0/CarbonFibre/glTF/CarbonFibre.gltf",
    thumbnail: "https://source.unsplash.com/random/300x300?carbon",
    type: 'gltf'
  },
  {
    id: 3,
    title: "Duck",
    artist: "Khronos Group",
    year: 2023,
    description: "The classic yellow rubber duck model, a common test asset in 3D graphics.",
    modelUrl: "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/main/2.0/Duck/glTF/Duck.gltf",
    thumbnail: "https://source.unsplash.com/random/300x300?duck",
    type: 'gltf'
  }
];

export default function Gallery() {
  const [selectedObject, setSelectedObject] = useState<Object3D | null>(null);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">3D Museum Gallery</h1>
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
              <Button onClick={() => setSelectedObject(object)}>View 3D</Button>
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
          <Button variant="outline">Back to Home</Button>
        </Link>
      </div>
    </div>
  );
}
