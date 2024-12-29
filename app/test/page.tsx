'use client'

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Filter, Calendar, SortDesc, DollarSign, GraduationCap, X } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function ScholarshipSearch() {
  const [showSearchModal, setShowSearchModal] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-green-50">
      {/* Mobile Search Modal */}
      {showSearchModal && (
        <div className="fixed inset-0 bg-white z-50 overflow-auto md:hidden">
          <div className="p-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-medium">検索する</h2>
              <button onClick={() => setShowSearchModal(false)}>
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-medium mb-2 flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    締切日
                  </h3>
                  <Input type="date" placeholder="mm/dd/yyyy" className="rounded-md" />
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <h3 className="font-medium mb-2 flex items-center gap-2">
                    <SortDesc className="h-4 w-4" />
                    並び替え
                  </h3>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="指定なし" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">指定なし</SelectItem>
                      <SelectItem value="deadline">締切日順</SelectItem>
                      <SelectItem value="amount">支給額順</SelectItem>
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <h3 className="font-medium mb-2 flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    金額指定
                  </h3>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="指定なし" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">指定なし</SelectItem>
                      <SelectItem value="under100">10万円以下</SelectItem>
                      <SelectItem value="100to300">10万円〜30万円</SelectItem>
                      <SelectItem value="over300">30万円以上</SelectItem>
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <h3 className="font-medium mb-2 flex items-center gap-2">
                    <GraduationCap className="h-4 w-4" />
                    奨学金タイプ
                  </h3>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="全て" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">全て</SelectItem>
                      <SelectItem value="grant">給付型</SelectItem>
                      <SelectItem value="loan">貸与型</SelectItem>
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>
            </div>

            <Button 
              className="w-full mt-6 bg-[#4AA5B8] hover:bg-[#3d8a99] text-white"
              onClick={() => setShowSearchModal(false)}
            >
              検索する
            </Button>
          </div>
        </div>
      )}

      {/* Hero */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8 text-center">
          あなたにぴったりの<br />
          奨学金を今すぐ探そう
        </h2>

        {/* Search Bar - Mobile */}
        <div className="md:hidden sticky top-16 bg-white/80 backdrop-blur-sm z-10 py-4">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <Input
              placeholder="検索する"
              className="pl-10 pr-10 rounded-full"
            />
            <button 
              className="absolute right-3 top-2.5"
              onClick={() => setShowSearchModal(true)}
            >
              <Filter className="h-5 w-5 text-gray-400" />
            </button>
          </div>
        </div>

        <div className="flex justify-center gap-4 mb-12">
          <Button variant="default" className="bg-black text-white hover:bg-gray-800">
            人気奨学金
          </Button>
          <Button variant="outline" className="bg-white">
            成績制限無し
          </Button>
          <Button variant="outline" className="bg-white">
            所得制限無し
          </Button>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-[300px,1fr] gap-8 max-w-6xl mx-auto">
          {/* Sidebar - Hidden on mobile unless filters are shown */}
          <div className={`sm: hidden md:block space-y-6`}>
            <Card>
              <CardContent className="p-4">
                <div className="relative hidden md:block">
                  <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <Input
                    placeholder="検索する"
                    className="pl-10"
                  />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <h3 className="font-bold mb-2">締切日</h3>
                <Input type="date" placeholder="mm/dd/yyyy" />
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <h3 className="font-bold mb-2">並び替え</h3>
                <Input placeholder="指定なし" />
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <h3 className="font-bold mb-2">金額指定</h3>
                <Input placeholder="指定なし" />
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <h3 className="font-bold mb-2">奨学金タイプ</h3>
                <Input placeholder="全て" />
              </CardContent>
            </Card>
          </div>

          {/* Scholarship Listings */}
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="w-full">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                    <div>
                      <h3 className="text-lg font-bold mb-2">
                        柳井正UNIQLO 海外給付型奨学金
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">提供者：あいうえお財団</p>
                      <div className="space-y-1">
                        <p className="text-sm">人数：100人</p>
                        <p className="text-sm">支給額：100円(一人当たり)</p>
                      </div>
                    </div>
                    <div className="md:text-right">
                      <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                        募集状況：受付中
                      </span>
                      <p className="text-sm mt-2">種類:給付型奨学金</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

