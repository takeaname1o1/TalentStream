
import AppHeader from '@/components/layout/header';
import JobForm from '@/components/jobs/job-form';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { UilArrowLeft } from '@iconscout/react-unicons';

export default function NewJobPage() {
  return (
      <div className="flex-1 flex flex-col">
          <AppHeader title="Create New Job" />
          <main className="flex-1 p-4 md:p-6 lg:p-8">
             <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-4 mb-6">
                    <Button variant="outline" size="icon" asChild>
                        <Link href="/jobs">
                            <UilArrowLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight font-headline">Create a New Job Posting</h2>
                        <p className="text-muted-foreground">
                        Fill out the details below to add a new job to your career page.
                        </p>                    </div>
                </div>
                <JobForm />
             </div>
          </main>
      </div>
  );
}
