"use client"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push('/login');
  }, [router]);  // El array de dependencias asegura que la redirección solo ocurre una vez

  return null;  // O un componente de carga si prefieres mostrar algo mientras redirige
}