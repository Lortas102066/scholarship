'use client'

import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from 'react'

export default function Home() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSendEmailClick = async () => {
    if (!email) {
      alert('メールアドレスを入力してください。')
      return
    }

    setStatus('loading')
    setMessage('')

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/email/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      })

      const data = await response.json()

      if (response.ok) {
        setStatus('success')
        setMessage(data.message)
        setEmail('')
      } else {
        throw new Error(data.message || 'メール送信に失敗しました。')
      }
    } catch (error) {
      console.error('Subscription Error:', error)
      setStatus('error')
      setMessage('予期せぬエラーが発生しました。')
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <section className="bg-white dark:bg-gray-900 flex items-center">
        <div className="container px-6 py-16 mx-auto text-center">
          <div className="max-w-lg mx-auto">
            <h1 className="text-3xl font-semibold text-gray-800 dark:text-white lg:hidden lg:text-4xl">
              あなたにぴったりの
              <br />奨学金を今すぐ探そう
            </h1>

            <h1 className="hidden text-3xl font-semibold text-gray-800 dark:text-white lg:block lg:text-4xl">
              あなたにぴったりの奨学金を
              <br />今すぐ探そう
            </h1>

            <p className="mt-6 text-gray-500 dark:text-gray-300">
              自分に最適な奨学金がわからない方は、ログインしてAIがぴったりの奨学金をご提案します。
            </p>
            <a
              href="/scholarship"
              className="inline-block px-5 py-2 mt-6 text-sm font-medium leading-5 text-center text-white capitalize bg-blue-600 rounded-lg hover:bg-blue-500 lg:mx-0 lg:w-auto focus:outline-none"
            >
              奨学金を検索
            </a>
          </div>

          <div className="flex justify-center mt-10">
            <img
              className="object-cover w-full h-96 rounded-xl lg:w-4/5"
              src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80"
              alt="奨学金を探すイメージ"
            />
          </div>
        </div>
      </section>


      {/* Subscribe section */}
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
  )
}