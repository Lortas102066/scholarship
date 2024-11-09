'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Home() {
  const router = useRouter()

  const handleGetStarted = () => {
    router.push("/scholarship")
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative flex-grow">
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

        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
          <div className="text-center text-neutral-content max-w-2xl">
            <h1 className="mb-9 text-5xl font-bold text-white">あなたの条件に合った奨学金を</h1>
            <p className="mb-5 text-2xl text-white">
              多様な奨学金プログラムの中から、最適なものを見つける
            </p>
            <button className="btn btn-primary text-base mb-8" onClick={handleGetStarted}>
              自分に合った奨学金を探す
            </button>
          </div>
        </div>
      </div>

      {/* New white section for Subscribe */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center">
            <h2 className="text-3xl font-bold mb-6 text-center">最新の奨学金情報を受け取る</h2>
            <div className="flex w-full max-w-sm items-center space-x-2">
              <Input type="email" placeholder="メールアドレス" />
              <Button type="submit">登録</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}