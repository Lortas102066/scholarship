'use client'

import { useState, useEffect, useRef } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, X } from 'lucide-react'
import SliderCard from '../components/SliderCard'

const filters = [
  { id: 'stem', label: 'STEM' },
  { id: 'arts', label: 'Arts & Humanities' },
  { id: 'leadership', label: 'Leadership' },
  { id: 'community', label: 'Community Service' },
  { id: 'international', label: 'International' },
]

export default function Component() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)
  const [dueDate, setDueDate] = useState('')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | ''>('')
  const filterRef = useRef<HTMLDivElement>(null)
  const firstResultRef = useRef<HTMLDivElement>(null)

  interface Scholarship {
    _id: string;
    scholarship_name: string;
    provider_name: string;
    capacity: number;
    award_amount: number;
    application_deadline: string;
    education_level: string;
    field_of_study?: string;
  }

  const [scholarships, setScholarships] = useState<Scholarship[]>([])

  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/database/scholarship`, { method: 'GET' })
        const data = await response.json()
        console.log('奨学金データ:', data)
        setScholarships(data)
      } catch (error) {
        console.error('奨学金の取得エラー:', error)
      }
    }
    fetchScholarships()
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setShowFilters(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    if (window.innerWidth <= 768 && firstResultRef.current) {
      firstResultRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [selectedFilters, dueDate, sortOrder])

  const handleFilterChange = (filterId: string) => {
    setSelectedFilters(prev => 
      prev.includes(filterId) 
        ? prev.filter(id => id !== filterId)
        : [...prev, filterId]
    )
  }

  const filteredScholarships = scholarships.filter(scholarship => {
    const matchesSearchTerm = scholarship.scholarship_name.toLowerCase().includes(searchTerm.toLowerCase())

    const selectedFilterIds = selectedFilters.filter(filterId => filters.some(f => f.id === filterId))
    const matchesFieldOfStudy = selectedFilterIds.length === 0 || selectedFilterIds.some(filterId => {
      return scholarship.field_of_study && scholarship.field_of_study.toLowerCase().includes(filterId.toLowerCase())
    })

    const matchesDueDate = !dueDate || new Date(scholarship.application_deadline) >= new Date(dueDate)

    return matchesSearchTerm && matchesFieldOfStudy && matchesDueDate
  })

  const sortedScholarships = [...filteredScholarships];

  if (sortOrder === 'asc') {
    sortedScholarships.sort((a, b) => a.award_amount - b.award_amount);
  } else if (sortOrder === 'desc') {
    sortedScholarships.sort((a, b) => b.award_amount - a.award_amount);
  }

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(amount);
  };

  return (
    <div className="container mx-auto p-4">  
      <div className='mt-8 md:mt-0'>
        <SliderCard />
      </div>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/4" ref={filterRef}>
            <div className="fixed top-[54px] left-0 right-0 p-4 pb-0 bg-white z-10 md:relative md:p-0">
              <div className="relative md:mb-6">
                  <div className="relative">
                  <Input
                      type="text"
                      placeholder="奨学金を検索..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      onClick={() => setShowFilters(true)}
                      className="pl-10"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  </div>
                  {showFilters && (
                  <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 md:hidden"
                      onClick={() => setShowFilters(false)}
                  >
                      <X className="h-4 w-4" />
                  </Button>
                  )}
              </div>
              <div className={`md:block ${showFilters ? 'block' : 'hidden'}`}>
                <Card className="mb-4">
                  <CardHeader>
                    <CardTitle>締切日</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Input
                      type="date"
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                      className="w-full"
                    />
                  </CardContent>
                </Card>
                <Card className="mb-4">
                  <CardHeader>
                    <CardTitle>並び替え</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-2 mb-2">
                      <input
                        type="radio"
                        id="sortNone"
                        name="sortOrder"
                        value=""
                        checked={sortOrder === ''}
                        onChange={() => setSortOrder('')}
                      />
                      <label htmlFor="sortNone" className="text-sm">
                        並び替えなし
                      </label>
                    </div>
                    <div className="flex items-center space-x-2 mb-2">
                      <input
                        type="radio"
                        id="sortAsc"
                        name="sortOrder"
                        value="asc"
                        checked={sortOrder === 'asc'}
                        onChange={() => setSortOrder('asc')}
                      />
                      <label htmlFor="sortAsc" className="text-sm">
                        金額の安い順
                      </label>
                    </div>
                    <div className="flex items-center space-x-2 mb-2">
                      <input
                        type="radio"
                        id="sortDesc"
                        name="sortOrder"
                        value="desc"
                        checked={sortOrder === 'desc'}
                        onChange={() => setSortOrder('desc')}
                      />
                      <label htmlFor="sortDesc" className="text-sm">
                        金額の高い順
                      </label>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                  <CardTitle>フィルター</CardTitle>
                  </CardHeader>
                  <CardContent>
                  {filters.map(filter => (
                    <div key={filter.id} className="flex items-center space-x-2 mb-2">
                      <Checkbox
                        id={filter.id}
                        checked={selectedFilters.includes(filter.id)}
                        onCheckedChange={() => handleFilterChange(filter.id)}
                      />
                      <label
                        htmlFor={filter.id}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {filter.label}
                      </label>
                    </div>
                  ))}
                  </CardContent>
                </Card>
              </div>
            </div>
        </div>
                  
        <div className="w-full md:w-3/4">
          <h2 className="text-2xl font-bold mb-4">奨学金リスト</h2>
          {sortedScholarships.map((scholarship, index) => (
            <Card key={scholarship._id} className="mb-4" ref={index === 0 ? firstResultRef : null}>
              <CardHeader>
                <CardTitle>{scholarship.scholarship_name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>提供者: {scholarship.provider_name}</p>
                <p>募集人数: {scholarship.capacity}</p>
                <p>金額: {formatCurrency(scholarship.award_amount)}</p>
                <p>締め切り: {new Date(scholarship.application_deadline).toLocaleDateString()}</p>
                <Button className="mt-2">申請する</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}