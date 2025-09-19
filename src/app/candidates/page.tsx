
import AppHeader from '@/components/layout/header';
import CandidateList from '@/components/candidates/candidate-list';
import { Suspense } from 'react';
import CandidateListSkeleton from '@/components/candidates/candidate-list-skeleton';

export default function CandidatesPage() {
  return (
    <div className="flex-1 flex flex-col">
      <AppHeader title="Candidates" />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <Suspense fallback={<CandidateListSkeleton />}>
            <CandidateList />
        </Suspense>
      </main>
    </div>
  );
}
