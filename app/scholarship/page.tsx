'use client';

import React, { useState, useEffect, useRef } from 'react';
import Filters from '@/app/components/Filters';
import ScholarshipsList from '@/app/components/ScholarshipsList';
import { Scholarship, Filter } from '@/types';

const filtersList: Filter[] = [
  { id: 'stem', label: 'STEM' },
  { id: 'arts', label: 'Arts & Humanities' },
  { id: 'leadership', label: 'Leadership' },
  { id: 'community', label: 'Community Service' },
  { id: 'international', label: 'International' },
];

const ScholarshipListPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [dueDate, setDueDate] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | ''>('');
  const firstResultRef = useRef<HTMLDivElement>(null);

  const [scholarships, setScholarships] = useState<Scholarship[]>([]);

  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/database/scholarship`, {
          method: 'GET',
        });
        const data = await response.json();
        console.log('奨学金データ:', data);
        setScholarships(data);
      } catch (error) {
        console.error('奨学金の取得エラー:', error);
      }
    };
    fetchScholarships();
  }, []);

  useEffect(() => {
    if (window.innerWidth <= 768 && firstResultRef.current) {
      firstResultRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [selectedFilters, dueDate, sortOrder]);

  const handleFilterChange = (filterId: string) => {
    setSelectedFilters((prev) =>
      prev.includes(filterId) ? prev.filter((id) => id !== filterId) : [...prev, filterId]
    );
  };

  const filteredScholarships = scholarships.filter((scholarship) => {
    const matchesSearchTerm = scholarship.scholarship_name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const selectedFilterIds = selectedFilters.filter((filterId) =>
      filtersList.some((f) => f.id === filterId)
    );
    const matchesFieldOfStudy =
      selectedFilterIds.length === 0 ||
      selectedFilterIds.some((filterId) => {
        return (
          scholarship.field_of_study &&
          scholarship.field_of_study.toLowerCase().includes(filterId.toLowerCase())
        );
      });

    const matchesDueDate =
      !dueDate || new Date(scholarship.application_deadline) >= new Date(dueDate);

    return matchesSearchTerm && matchesFieldOfStudy && matchesDueDate;
  });

  const sortedScholarships = [...filteredScholarships];

  if (sortOrder === 'asc') {
    sortedScholarships.sort((a, b) => a.award_amount - b.award_amount);
  } else if (sortOrder === 'desc') {
    sortedScholarships.sort((a, b) => b.award_amount - a.award_amount);
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-6">
        <Filters
          filters={filtersList}
          selectedFilters={selectedFilters}
          handleFilterChange={handleFilterChange}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          dueDate={dueDate}
          setDueDate={setDueDate}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
        />
        <ScholarshipsList scholarships={sortedScholarships} firstResultRef={firstResultRef} />
      </div>
    </div>
  );
};

export default ScholarshipListPage;
