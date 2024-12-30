import { notFound } from "next/navigation"
import { Users, JapaneseYenIcon as Yen, GraduationCap } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default async function ScholarshipDetail({ 
  params 
}: { 
  params: { id: string } 
}) {
  const { id } = params
  console.log("id:", id)

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/database/scholarship/${id}`, {
  })

  if (!res.ok) {
    console.error('Failed to fetch scholarship')
    notFound() 
  }

  const scholarship = await res.json()

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto p-4">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-start justify-between mb-4">
            <h1 className="text-xl font-bold">
              {scholarship.name}
            </h1>
            <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
              {scholarship.isGranted ? '給付決定済み' : '募集受付中'}
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-2">
            提供者：{scholarship.provider}
          </p> 
          <p className="text-sm">
            {scholarship.desc}
          </p>
        </div>

        {/* Info Cards */}
        <div className="space-y-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center">
                <Users className="h-6 w-6 mb-2" />
                <div className="text-sm text-gray-600">募集人数</div>
                <div className="text-xl font-bold">
                  {scholarship.capacity}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center">
                <Yen className="h-6 w-6 mb-2" />
                <div className="text-sm text-gray-600">支給額</div>
                <div className="text-xl font-bold">
                  {scholarship.amounts.map((amount: { currency: string; amount: number; duration: number }, index: number) => (
                    <div key={index}>
                      {amount.currency} {amount.amount.toLocaleString()} ({amount.duration}ヶ月)
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center">
                <GraduationCap className="h-6 w-6 mb-2" />
                <div className="text-sm text-gray-600">奨学金種類</div>
                <div className="text-xl font-bold">
                  {scholarship.isGranted ? '給付型奨学金' : '貸付型奨学金'}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Requirements */}
        <div className="mb-8">
          <h2 className="text-lg font-bold mb-4">応募条件</h2>
          <ol className="list-decimal pl-4 space-y-2">
            <li>成績を3.5/5以上を維持していること</li>
            <li>親の収入が年収1,000万円を超えていないこと</li>
            <li>日本国内の大学へ進学予定</li>
          </ol>
        </div>

        {/* Action Button */}
        <a target="_blank"　href={scholarship.link}>
          <Button className="w-full bg-black text-white hover:bg-gray-800">
              公式ページへ
          </Button>
        </a>
        
      </div>
    </div>
  )
}
