
import { jobs as initialJobs } from '@/lib/data';

export async function generateStaticParams() {
  // In a real app, you'd fetch this data from a database or CMS.
  // For this prototype, we'll use the initial hardcoded data.
  return initialJobs.map((job) => ({
    jobId: job.id,
  }));
}

export default function JobLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
