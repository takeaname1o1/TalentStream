
import { initialCandidates } from '@/lib/data';

export async function generateStaticParams() {
  // In a real app, you'd fetch this data from a database or CMS.
  // For this prototype, we'll use the initial hardcoded data, which is empty.
  return initialCandidates.map((candidate) => ({
    candidateId: candidate.id,
  }));
}

export default function EditCandidateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
