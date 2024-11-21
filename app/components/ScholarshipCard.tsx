import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Scholarship } from '@/types';

interface ScholarshipCardProps {
  scholarship: Scholarship;
  index: number;
  firstResultRef?: React.RefObject<HTMLDivElement>;
}

const ScholarshipCard: React.FC<ScholarshipCardProps> = ({ scholarship, index, firstResultRef }) => {
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(amount);
  };

  return (
    <Card ref={index === 0 ? firstResultRef : null} className="mb-4">
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
  );
};

export default ScholarshipCard;
