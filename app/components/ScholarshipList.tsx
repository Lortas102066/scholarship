import React, { RefObject } from 'react';
import ScholarshipCard from './ScholarshipCard';

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

interface ScholarshipListProps {
  scholarships: Scholarship[];
  formatCurrency: (amount: number) => string;
  firstResultRef: RefObject<HTMLDivElement>;
}

const ScholarshipList: React.FC<ScholarshipListProps> = ({ scholarships, formatCurrency, firstResultRef }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">奨学金リスト</h2>
      {scholarships.map((scholarship, index) => (
        <div key={scholarship._id} ref={index === 0 ? firstResultRef : null}>
          <ScholarshipCard scholarship={scholarship} formatCurrency={formatCurrency} />
        </div>
      ))}
    </div>
  );
};

export default ScholarshipList;
