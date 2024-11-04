import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
      <h1 className="text-4xl font-bold mb-6">Welcome to Museum Gallery 3D</h1>
      <p className="text-xl mb-8">Explore our collection of 3D models</p>
      <Link href="/gallery">
        <Button size="lg">Enter Gallery</Button>
      </Link>
    </div>
  );
}