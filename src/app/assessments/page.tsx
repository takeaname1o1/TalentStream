
'use client';

import AppHeader from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { useAssessments } from '@/hooks/use-assessments';
import { UilPlusCircle, UilFileAlt, UilArrowRight, UilSpinner } from '@iconscout/react-unicons';

export default function AssessmentsPage() {
  const [assessments, , isLoaded] = useAssessments();

  return (
      <div className="flex-1 flex flex-col">
          <AppHeader title="Assessments" />
          <main className="flex-1 p-4 md:p-6 lg:p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold tracking-tight font-headline">Assessments</h2>
                <p className="text-muted-foreground">
                  Create and manage assessments for your job openings.
                </p>
              </div>
              <Link href="/assessments/new" passHref>
                <Button>
                  <UilPlusCircle className="mr-2 h-4 w-4" />
                  New Assessment
                </Button>
              </Link>
            </div>

            {!isLoaded ? (
                <div className="flex items-center justify-center h-96 border rounded-lg shadow-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <UilSpinner className="h-6 w-6 animate-spin" />
                        <p className="text-lg">Loading assessments...</p>
                    </div>
                </div>
            ) : assessments.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-center border-2 border-dashed rounded-lg p-12 h-96">
                    <UilFileAlt className="h-16 w-16 text-muted-foreground mb-4" />
                    <h3 className="text-xl font-semibold font-headline mb-2">No Assessments Yet</h3>
                    <p className="text-muted-foreground mb-4">
                    Get started by creating your first assessment.
                    </p>
                    <Link href="/assessments/new" passHref>
                      <Button>
                          <UilPlusCircle className="mr-2 h-4 w-4" />
                          Create Assessment
                      </Button>
                    </Link>
                </div>
            ) : (
                <div className="grid gap-6">
                    {assessments.map((assessment) => (
                        <Card key={assessment.id} className="shadow-sm hover:shadow-md transition-shadow">
                            <CardHeader>
                                <CardTitle className="font-headline">{assessment.title}</CardTitle>
                                <CardDescription>{assessment.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex justify-between items-center">
                                    <p className="text-sm text-muted-foreground">{assessment.questions.length} Questions</p>
                                    <Button variant="outline" size="sm" asChild>
                                        <Link href={`/assessments/${assessment.id}`}> 
                                            View Assessment
                                            <UilArrowRight className="ml-2 h-4 w-4" />
                                        </Link>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
          </main>
      </div>
  );
}
