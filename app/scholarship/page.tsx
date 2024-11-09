'use client'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search } from "lucide-react"

const scholarships = [
  { id: 1, name: "STEM Excellence Scholarship", amount: "$5000", deadline: "2024-05-15" },
  { id: 2, name: "Future Leaders Grant", amount: "$3000", deadline: "2024-06-30" },
  { id: 3, name: "Arts and Humanities Fellowship", amount: "$4000", deadline: "2024-07-31" },
  { id: 4, name: "Community Service Award", amount: "$2500", deadline: "2024-08-15" },
  { id: 5, name: "International Student Scholarship", amount: "$6000", deadline: "2024-09-01" },
]

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

  const handleFilterChange = (filterId: string) => {
    setSelectedFilters(prev => 
      prev.includes(filterId) 
        ? prev.filter(id => id !== filterId)
        : [...prev, filterId]
    )
  }

  const filteredScholarships = scholarships.filter(scholarship => 
    scholarship.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="container mx-auto p-4">  
        <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/4">
                <div className="mb-6">
                    <div className="relative">
                    <Input
                        type="text"
                        placeholder="Search scholarships..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    </div>
                </div>
                <Card>
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
                <Card>
                    <CardHeader>
                    <CardTitle>Filters</CardTitle>
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
        
        <div className="w-full md:w-3/4">
          <h2 className="text-2xl font-bold mb-4">Available Scholarships</h2>
          {filteredScholarships.map(scholarship => (
            <Card key={scholarship.id} className="mb-4">
              <CardHeader>
                <CardTitle>{scholarship.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Amount: {scholarship.amount}</p>
                <p>Deadline: {scholarship.deadline}</p>
                <Button className="mt-2">Apply Now</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}