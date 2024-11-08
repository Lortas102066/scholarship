"use client";
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push("/scholarship");
  };

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 z-0">
        <Image
          src="/scholar-hero.png"
          fill
          quality={100}
          alt="Background"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-60"></div> 
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="text-center text-neutral-content max-w-2xl">
          <h1 className="mb-9 text-5xl font-bold">あなたの条件に合った奨学金を</h1>
          <p className="mb-5">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
            quasi. In deleniti eaque aut repudiandae et a id nisi.
          </p>
          <button className="btn btn-primary" onClick={handleGetStarted}>Get Started</button>
        </div>
      </div>
    </div>
  );
}
