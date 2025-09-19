
import AppHeader from '@/components/layout/header';
import JobForm from '@/components/jobs/job-form';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { UilArrowLeft } from '@iconscout/react-unicons';

export default function EditJobPage({ params }: { params: { jobId: string } }) {
  return (
      <div className="flex-1 flex flex-col">
          <AppHeader title="Edit Job" />
          <main className="flex-1 p-4 md:p-6 lg:p-8">
             <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-4 mb-6">
                    <Button variant="outline" size="icon" asChild>
                        <Link href="/jobs">
                            <UilArrowLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight font-headline">Edit Job Posting</h2>
                        <p className="text-muted-foreground">
                            Update the details for this job posting.
                        </p>
                    </div>
                </div>
                <JobForm jobId={params.jobId} />
             </div>
          </main>
      </div>
  );
}
