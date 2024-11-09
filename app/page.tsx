'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, FormEvent } from 'react';

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleGetStarted = () => {
    router.push("/scholarship");
  };

  const handleSendEmailClick = async () => {
    if (!email) {
      alert('メールアドレスを入力してください。');
      return;
    }

    setStatus('loading');
    setMessage('');

    try {
      const response = await fetch('/api/email/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage(data.message);
        setEmail('');
      } else {
        throw new Error(data.message || 'メール送信に失敗しました。');
      }
    } catch (error: any) {
      console.error('Subscription Error:', error);
      setStatus('error');
      setMessage(error.message || '予期せぬエラーが発生しました。');
    }
  };

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
              <Input 
                type="email" 
                placeholder="メールアドレス" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
              />
              <Button 
                type="button" 
                onClick={handleSendEmailClick} 
                disabled={status === 'loading'}
              >
                {status === 'loading' ? '登録中...' : '登録'}
              </Button>
            </div>
            {message && (
              <p className={`mt-4 text-center ${status === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                {message}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
