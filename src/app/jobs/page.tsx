
import AppHeader from '@/components/layout/header';
import JobList from '@/components/jobs/job-list';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { UilPlusCircle, UilSpinner } from '@iconscout/react-unicons';
import { Suspense } from 'react';

export default function JobsPage() {
  return (
    <div className="flex-1 flex flex-col">
      <AppHeader title="Jobs" />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight font-headline">Job Postings</h2>
            <p className="text-muted-foreground">
              Manage your company's job openings.
            </p>
          </div>
          <Link href="/jobs/new" passHref>
            <Button>
              <UilPlusCircle className="mr-2 h-4 w-4" />
              Add Job
            </Button>
          </Link>
        </div>
        <Suspense fallback={
            <div className="flex items-center justify-center h-96 border rounded-lg shadow-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                    <UilSpinner className="h-6 w-6 animate-spin" />
                    <p className="text-lg">Loading jobs...</p>
                </div>
            </div>
        }>
          <JobList />
        </Suspense>
      </main>
    </div>
  );
}
