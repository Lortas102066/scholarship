import React from 'react';
import ScholarshipCard from './ScholarshipCard';
import { Scholarship } from '@/types';

interface ScholarshipsListProps {
  scholarships: Scholarship[];
  firstResultRef: React.RefObject<HTMLDivElement>;
}

const ScholarshipsList: React.FC<ScholarshipsListProps> = ({ scholarships, firstResultRef }) => {
  return (
    <div className="w-full md:w-3/4">
      <h2 className="text-2xl font-bold mb-4">奨学金リスト</h2>
      {scholarships.map((scholarship, index) => (
        <ScholarshipCard
          key={scholarship._id}
          scholarship={scholarship}
          index={index}
          firstResultRef={index === 0 ? firstResultRef : undefined}
        />
      ))}
    </div>
  );
};

export default ScholarshipsList;
