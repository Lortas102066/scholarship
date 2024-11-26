import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, X } from 'lucide-react';

interface Filter {
  id: string;
  label: string;
}

interface FilterSidebarProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  selectedFilters: string[];
  handleFilterChange: (filterId: string) => void;
  dueDate: string;
  setDueDate: (value: string) => void;
  sortOrder: 'asc' | 'desc' | '';
  setSortOrder: (value: 'asc' | 'desc' | '') => void;
  showFilters: boolean;
  setShowFiltersAndBackdrop: (show: boolean) => void;
  filters: Filter[];
  filterRef: React.RefObject<HTMLDivElement>;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  searchTerm,
  setSearchTerm,
  selectedFilters,
  handleFilterChange,
  dueDate,
  setDueDate,
  sortOrder,
  setSortOrder,
  showFilters,
  setShowFiltersAndBackdrop,
  filters,
  filterRef,
}) => {
  return (
    <div className="w-full md:w-1/4" ref={filterRef}>
      <div
        className={`fixed top-[54px] left-0 right-0 p-4 ${
          showFilters ? 'pb-4' : 'pb-0'
        } bg-white z-30 md:relative md:p-0 md:z-10`}
      >
        <div className="relative md:mb-6">
          <div className="relative">
            <Input
              type="text"
              placeholder="奨学金を検索..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onClick={() => {
                if (window.innerWidth <= 768) {
                  setShowFiltersAndBackdrop(true);
                }
              }}
              className="pl-10"
            />
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
          </div>
          {showFilters && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 md:hidden"
              onClick={() => setShowFiltersAndBackdrop(false)}
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
              {filters.map((filter) => (
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
  );
};

export default FilterSidebar;
