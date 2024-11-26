import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

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

interface ScholarshipCardProps {
  scholarship: Scholarship;
  formatCurrency: (amount: number) => string;
}

const ScholarshipCard: React.FC<ScholarshipCardProps> = ({ scholarship, formatCurrency }) => {
  return (
    <Card className="mb-4">
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
