'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useRouter } from 'next/navigation';

type FormData = {
  education_level?: string;
  gpa?: string;
  dateOfBirth?: string;
  income?: string;
  isPersonalInfoFilled?: boolean;
};

const INITIAL_DATA: FormData = {
  education_level: '',
  gpa: '',
  dateOfBirth: '',
  income: '',
  isPersonalInfoFilled: false,
};

export default function Component() {
  const [data, setData] = useState(INITIAL_DATA);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const router = useRouter();

  // Rearranged the steps so "Date of Birth" is first
  const steps = [
    { title: 'Date of Birth', description: 'Enter your date of birth' },
    { title: 'Education Level', description: 'Enter your education level' },
    { title: 'GPA', description: 'Enter your GPA' },
    { title: 'Income', description: 'Enter your annual income' },
  ];

  function updateFields(fields: Partial<FormData>) {
    setData(prev => ({ ...prev, ...fields }));
  }

  function next() {
    setCurrentStepIndex(i => {
      if (i >= steps.length - 1) return i;
      return i + 1;
    });
  }

  function back() {
    setCurrentStepIndex(i => {
      if (i <= 0) return i;
      return i - 1;
    });
  }

  function skip() {
    next();
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (currentStepIndex === steps.length - 1) {
        const submitData = { ...data, isPersonalInfoFilled: true };
        console.log(submitData);
        try {
          const response = await fetch('/api/database/updateUser', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(submitData),
          });
          if (response.ok) {
            router.push('/personal-scholarship');
          } else {
            console.error('Server error:', response.statusText);
          }
        } catch (error) {
          console.error('Error submitting data:', error);
        }
      } else {
        next();
      }
  }
  

  const step = steps[currentStepIndex];

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[350px]">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>{step.title}</CardTitle>
            <CardDescription>{step.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={(currentStepIndex / (steps.length - 1)) * 100} className="mb-4" />
            {currentStepIndex === 0 && (
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={data.dateOfBirth}
                    onChange={e => updateFields({ dateOfBirth: e.target.value })}
                  />
                </div>
              </div>
            )}
            {currentStepIndex === 1 && (
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="education_level">Education Level</Label>
                  <Input
                    id="education_level"
                    value={data.education_level}
                    onChange={e => updateFields({ education_level: e.target.value })}
                  />
                </div>
              </div>
            )}
            {currentStepIndex === 2 && (
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="gpa">GPA</Label>
                  <Input
                    id="gpa"
                    type="number"
                    step="0.01"
                    value={data.gpa}
                    onChange={e => updateFields({ gpa: e.target.value })}
                  />
                </div>
              </div>
            )}
            {currentStepIndex === 3 && (
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="income">Income</Label>
                  <Input
                    id="income"
                    type="number"
                    value={data.income}
                    onChange={e => updateFields({ income: e.target.value })}
                  />
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={back}
              disabled={currentStepIndex === 0}
            >
              Back
            </Button>
            <div className="flex space-x-2">
              <Button type="button" variant="ghost" onClick={skip}>
                Skip
              </Button>
              <Button type="submit">
                {currentStepIndex === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
