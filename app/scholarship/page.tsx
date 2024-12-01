"use client";
import React, { useState, useEffect, useRef } from 'react';
import FilterSidebar from '../components/FilterSidebar';
import ScholarshipList from '../components/ScholarshipList';
import SliderCard from '../components/SliderCard';

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

const filters = [
  { id: 'stem', label: 'STEM' },
  { id: 'arts', label: 'Arts & Humanities' },
  { id: 'leadership', label: 'Leadership' },
  { id: 'community', label: 'Community Service' },
  { id: 'international', label: 'International' },
];

const ScholarshipPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [dueDate, setDueDate] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | ''>('');
  const filterRef = useRef<HTMLDivElement>(null);
  const firstResultRef = useRef<HTMLDivElement>(null);
  const [isBackdropVisible, setIsBackdropVisible] = useState(false);

  const [scholarships, setScholarships] = useState<Scholarship[]>([]);

  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/database/scholarship`);
        const data = await response.json();
        setScholarships(data);
      } catch (error) {
        console.error('奨学金の取得エラー:', error);
      }
    };
    fetchScholarships();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setShowFiltersAndBackdrop(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (window.innerWidth <= 768 && firstResultRef.current) {
      firstResultRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [selectedFilters, dueDate, sortOrder]);

  useEffect(() => {
    if (isBackdropVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'visible';
    }

    return () => {
      document.body.style.overflow = 'visible';
    };
  }, [isBackdropVisible]);

  const setShowFiltersAndBackdrop = (show: boolean) => {
    setShowFilters(show);
    setIsBackdropVisible(show);
  };

  const handleFilterChange = (filterId: string) => {
    setSelectedFilters((prev) =>
      prev.includes(filterId) ? prev.filter((id) => id !== filterId) : [...prev, filterId]
    );
  };

  const filteredScholarships = scholarships.filter((scholarship) => {
    const matchesSearchTerm = scholarship.scholarship_name.toLowerCase().includes(searchTerm.toLowerCase());

    const selectedFilterIds = selectedFilters.filter((filterId) => filters.some((f) => f.id === filterId));
    const matchesFieldOfStudy =
      selectedFilterIds.length === 0 ||
      selectedFilterIds.some((filterId) => {
        return scholarship.field_of_study && scholarship.field_of_study.toLowerCase().includes(filterId.toLowerCase());
      });

    const matchesDueDate = !dueDate || new Date(scholarship.application_deadline) >= new Date(dueDate);

    return matchesSearchTerm && matchesFieldOfStudy && matchesDueDate;
  });

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
    <div className={`container mx-auto p-4 relative ${isBackdropVisible ? 'overflow-hidden' : ''}`}>
      {isBackdropVisible && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={() => setShowFiltersAndBackdrop(false)}
        ></div>
      )}

      <div className="mt-8 md:mt-0">
        <SliderCard />
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <FilterSidebar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedFilters={selectedFilters}
          handleFilterChange={handleFilterChange}
          dueDate={dueDate}
          setDueDate={setDueDate}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          showFilters={showFilters}
          setShowFiltersAndBackdrop={setShowFiltersAndBackdrop}
          filters={filters}
          filterRef={filterRef}
        />

        <div className="w-full md:w-3/4">
          <ScholarshipList
            scholarships={sortedScholarships}
            formatCurrency={formatCurrency}
            firstResultRef={firstResultRef}
          />
        </div>
      </div>
    </div>
  );
};

export default ScholarshipPage;
