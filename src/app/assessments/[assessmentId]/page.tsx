
'use client';

import AppHeader from '@/components/layout/header';
import { notFound, useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useAssessments } from '@/hooks/use-assessments';
import { useEffect, useState } from 'react';
import type { Assessment } from '@/lib/types';
import { UilArrowLeft, UilClipboardAlt, UilQuestionCircle, UilSpinner } from '@iconscout/react-unicons';

export default function AssessmentDetailPage() {
  const params = useParams();
  const assessmentId = params.assessmentId as string;
  const [assessments, , isLoaded] = useAssessments();
  const [assessment, setAssessment] = useState<Assessment | undefined | null>(undefined);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isLoaded && isClient) {
        const foundAssessment = assessments.find(a => a.id === assessmentId);
        setAssessment(foundAssessment || null);
    }
  }, [isLoaded, isClient, assessments, assessmentId]);

  if (!isClient || assessment === undefined) {
    return (
        <div className="flex-1 flex flex-col">
            <AppHeader title="Loading Assessment..." />
            <main className="flex-1 p-4 md:p-6 lg:p-8 flex items-center justify-center">
                <div className="flex items-center gap-2 text-muted-foreground">
                    <UilSpinner className="h-6 w-6 animate-spin" />
                    <p className="text-lg">Loading assessment data...</p>
                </div>
            </main>
        </div>
    )
  }

  if (assessment === null) {
    notFound();
  }

  const getQuestionTypeLabel = (type: string) => {
    switch (type) {
        case 'single-choice': return 'Single Choice';
        case 'multi-choice': return 'Multiple Choice';
        case 'short-text': return 'Short Text';
        case 'long-text': return 'Long Text';
        case 'numeric-range': return 'Numeric Range';
        case 'file-upload': return 'File Upload';
        default: return 'Unknown';
    }
  }

  return (
    <div className="flex-1 flex flex-col">
      <AppHeader title="Assessment Details" />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="outline" size="icon" asChild>
                <Link href="/assessments">
                    <UilArrowLeft className="h-4 w-4" />
                </Link>
            </Button>
            <div>
                <h2 className="text-2xl font-bold tracking-tight font-headline">{assessment.title}</h2>
                <p className="text-muted-foreground">
                  View details for this assessment.
                </p>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>{assessment.title}</CardTitle>
              <CardDescription>{assessment.description}</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
               <div className="flex items-center gap-2">
                <UilClipboardAlt className="h-4 w-4 text-muted-foreground" />
                <span className="font-semibold">Questions:</span>
                <Badge variant="secondary">{assessment.questions.length}</Badge>
              </div>
              <Separator />
              <div>
                <h3 className="text-lg font-semibold mb-4 font-headline">Questions</h3>
                <div className="space-y-6">
                    {assessment.questions.map((question, index) => (
                        <div key={question.id}>
                            <div className='flex justify-between items-start'>
                                <p className="font-semibold">{index + 1}. {question.text}</p>
                                <Badge variant="outline">{getQuestionTypeLabel(question.type)}</Badge>
                            </div>
                             {(question.type === 'single-choice' || question.type === 'multi-choice') && question.options && (
                                <div className="mt-2 pl-6 space-y-2">
                                    {question.options.map((option, optionIndex) => (
                                        <div key={optionIndex} className="flex items-center gap-2">
                                            <UilQuestionCircle className="h-3 w-3 text-muted-foreground" />
                                            <span className="text-sm text-muted-foreground">{option.value}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
