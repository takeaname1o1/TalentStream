
import { initialAssessments } from '@/lib/data';

export async function generateStaticParams() {
  // In a real app, you'd fetch this data from a database or CMS.
  // For this prototype, we'll use the initial hardcoded data.
  return initialAssessments.map((assessment) => ({
    assessmentId: assessment.id,
  }));
}

export default function AssessmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
