
import AppHeader from '@/components/layout/header';
import AssessmentBuilder from '@/components/assessments/assessment-builder';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { UilArrowLeft } from '@iconscout/react-unicons';

export default function NewAssessmentPage() {
  return (
      <div className="flex-1 flex flex-col">
          <AppHeader title="Create New Assessment" />
          <main className="flex-1 p-4 md:p-6 lg:p-8">
             <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-4 mb-6">
                    <Button variant="outline" size="icon" asChild>
                        <Link href="/assessments">
                            <UilArrowLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight font-headline">Assessment Builder</h2>
                        <p className="text-muted-foreground">
                        Design a new assessment to evaluate your candidates.
                        </p>
                    </div>
                </div>
                <AssessmentBuilder />
             </div>
          </main>
      </div>
  );
}
