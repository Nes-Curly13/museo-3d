import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { ChevronDown } from 'lucide-react'

interface Object3D {
  id: number;
  title: string;
  artist: string;
  year: number;
  description: string;
  modelUrl: string;
  thumbnail: string;
  type: string;
}

const objects3D: Object3D[] = [
  {
    id: 1,
    title: "Modelo Ordoñes",
    artist: "ordoñez",
    year: 2023,
    description: "Un elemento artesanal tipo vasija de la epoca precolombina.",
    modelUrl: "/Modelos3D/MODELO_ORDONEZ/modeloordonez.gltf",
    thumbnail: "/images/modeloordonez.png",
    type: 'gltf'
  },
  {
    id: 2,
    title: "Modelo Chaguezac",
    artist: "Khronos Group",
    year: 2023,
    description: "Un elemento artesanal tipo jarron de la epoca precolombina.",
    modelUrl: "/Modelos3D/MODELO_CHAGUEZAC_F/modelochaguezac.gltf",
    thumbnail: "/images/modelochaguezac.png",
    type: 'gltf'
  },
  {
    id: 3,
    title: "Modelo Hurtado",
    artist: "Khronos Group",
    year: 2023,
    description: "Un elemento artesanal tipo recipiente de la epoca precolombina.",
    modelUrl: "/Modelos3D/MODELO_HURTADO/modelohurtado.gltf",
    thumbnail: "/images/modelohurtado.png",
    type: 'gltf'
  },
  {
    id: 4,
    title: "Modelo Molina",
    artist: "Khronos Group",
    year: 2023,
    description: "Un elemento artesanal tipo vaso de la epoca precolombina.",
    modelUrl: "/Modelos3D/MODELO_MOLINA/modelo_molina.gltf",
    thumbnail: "/images/modelomolina.png",
    type: 'gltf'
  },
  {
    id: 5,
    title: "Modelo Abadia",
    artist: "Khronos Group",
    year: 2023,
    description: "Un elemento artesanal tipo jarra de la epoca precolombina.",
    modelUrl: "https://dd7090f1.3delements.pages.dev/modeloabadia.glb",
    thumbnail: "/images/modelo_abadia_sarria.png",
    type: 'gltf'
  }
];


export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="fixed top-0 w-full bg-blu
      e-900/80 backdrop-blur-sm z-50">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-white">
            Museo Virtual
          </Link>
          <div className="space-x-4 text-blue-100">
            <Link href="/about" className="hover:underline hover:text-white">
              Acerca de
            </Link>
            <Link href="/gallery" className="hover:underline hover:text-white">
              Galería
            </Link>
            <Link href="/contact" className="hover:underline hover:text-white">
              Contacto
            </Link>
          </div>
        </div>
      </nav>

      <section className="flex flex-col items-center justify-center min-h-screen pt-16">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-center">
          Bienvenido al Museo Virtual Precolombino
        </h1>
        <p className="text-xl mb-8 text-center max-w-2xl">
          Explora nuestra colección de artefactos 3D y sumérgete en la rica historia de la época precolombina.
        </p>
        <Link href="/gallery">
          <Button size="lg">Entrar a la Galería</Button>
        </Link>
        <ChevronDown className="animate-bounce mt-12" size={32} />
      </section>

      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Exhibiciones Destacadas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {objects3D.map((object) => (
              
              <Card key={object.id} className="overflow-hidden transition-transform hover:scale-105 bg-gray-800 text-white">
                <CardHeader className="p-0">
                  <Image
                    src={object.thumbnail}
                    alt={object.title}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                </CardHeader>
                <CardContent className="p-4">
                  <CardTitle>{object.title}</CardTitle>
                  <CardDescription className="text-gray-300">
                    Artista: {object.artist} | Año: {object.year}
                  </CardDescription>
                  <p className="mt-2 text-sm">{object.description}</p>
                </CardContent>
                <CardFooter>
                  
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-black">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Explora la Historia Precolombina</h2>
          <p className="text-xl mb-8">
            Nuestro museo virtual te ofrece una experiencia única para descubrir y aprender sobre los artefactos de la época precolombina.
          </p>
          <Link href="/about">
            <Button variant="outline" size="lg">
              Conoce Más Sobre Nosotros
            </Button>
          </Link>
        </div>
      </section>

      <footer className="bg-gray-900 py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2023 Museo Virtual Precolombino. Todos los derechos reservados.</p>
          <div className="mt-4">
            <Link href="/privacy" className="text-sm hover:underline mr-4">
              Política de Privacidad
            </Link>
            <Link href="/terms" className="text-sm hover:underline">
              Términos de Uso
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}