
'use client';

import AppHeader from '@/components/layout/header';
import { notFound, useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import type { Job } from '@/lib/types';
import { useEffect, useState } from 'react';
import { useJobs } from '@/hooks/use-jobs';
import { UilArrowLeft, UilBriefcaseAlt, UilTagAlt, UilEye, UilClipboardAlt, UilSpinner } from '@iconscout/react-unicons';

export default function JobDetailPage() {
  const params = useParams();
  const jobId = params.jobId as string;
  const [jobs, , isLoaded] = useJobs();
  const [job, setJob] = useState<Job | undefined | null>(undefined);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isLoaded && isClient) {
      const foundJob = jobs.find(j => j.id === jobId);
      setJob(foundJob || null);
    }
  }, [isLoaded, isClient, jobs, jobId]);

  if (!isClient || job === undefined) {
    return (
        <div className="flex-1 flex flex-col">
            <AppHeader title="Loading Job..." />
            <main className="flex-1 p-4 md:p-6 lg:p-8 flex items-center justify-center">
                <div className="flex items-center gap-2 text-muted-foreground">
                    <UilSpinner className="h-6 w-6 animate-spin" />
                    <p className="text-lg">Loading job data...</p>
                </div>
            </main>
        </div>
    )
  }

  if (job === null) {
    notFound();
  }

  return (
    <div className="flex-1 flex flex-col">
      <AppHeader title="Job Details" />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="outline" size="icon" asChild>
                <Link href="/jobs">
                    <UilArrowLeft className="h-4 w-4" />
                </Link>
            </Button>
            <div>
                <h2 className="text-2xl font-bold tracking-tight font-headline">{job.title}</h2>
                <p className="text-muted-foreground">
                  View details for this job posting.
                </p>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>{job.title}</CardTitle>
            </CardHeader>
            <CardContent className="p-6 grid gap-4">
               <div className="flex items-center gap-2">
                <UilBriefcaseAlt className="h-4 w-4 text-muted-foreground" />
                <span className="font-semibold">Status:</span>
                <Badge variant={job.status === 'Active' ? 'default' : 'secondary'} className={job.status === 'Active' ? 'bg-green-100 text-green-800' : ''}>
                  {job.status}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                  <UilTagAlt className="h-4 w-4 text-muted-foreground" />
                  <span className="font-semibold">Tags:</span>
                   <div className="flex flex-wrap gap-2">
                    {job.tags.map((tag) => (
                        <Badge key={tag} variant="outline">{tag}</Badge>
                    ))}
                    </div>
              </div>
              <Separator className="my-4" />
              <div className="flex flex-wrap gap-2">
                <Button asChild>
                    <Link href={`/candidates?jobId=${job.id}`}>
                        <UilEye className="mr-2 h-4 w-4" />
                        View Candidates
                    </Link>
                </Button>
                <Button asChild variant="outline">
                    <Link href={`/assessments?jobId=${job.id}`}>
                        <UilClipboardAlt className="mr-2 h-4 w-4" />
                        View Assessments
                    </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
