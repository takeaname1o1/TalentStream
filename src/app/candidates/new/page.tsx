
import AppHeader from '@/components/layout/header';
import CandidateForm from '@/components/candidates/candidate-form';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { UilArrowLeft } from '@iconscout/react-unicons';

export default function NewCandidatePage() {
  return (
      <div className="flex-1 flex flex-col">
          <AppHeader title="Add New Candidate" />
          <main className="flex-1 p-4 md:p-6 lg:p-8">
             <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-4 mb-6">
                    <Button variant="outline" size="icon" asChild>
                        <Link href="/candidates">
                            <UilArrowLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight font-headline">Add a New Candidate</h2>
                        <p className="text-muted-foreground">
                            Fill out the details below to add a new candidate to the system.
                        </p>
                    </div>
                </div>
                <CandidateForm />
             </div>
          </main>
      </div>
  );
}
