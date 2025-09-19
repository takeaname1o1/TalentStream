
import { initialCandidates } from '@/lib/data';

export async function generateStaticParams() {
  // In a real app, you'd fetch this data from a database or CMS.
  // For this prototype, we'll use the initial hardcoded data.
  // Since there are no initial candidates, this will be empty,
  // but it's required for `output: 'export'`.
  return initialCandidates.map((candidate) => ({
    candidateId: candidate.id,
  }));
}

export default function CandidateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
