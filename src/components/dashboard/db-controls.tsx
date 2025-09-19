
'use client';

import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import type { Candidate, Activity, Job, Stage, Assessment, AssessmentQuestion } from '@/lib/types';
import { faker } from '@faker-js/faker';
import { UilDatabase, UilTrashAlt } from '@iconscout/react-unicons';

interface DbControlsProps {
  setCandidates: (candidates: Candidate[] | ((c: Candidate[]) => Candidate[])) => void;
  setActivities: (activities: Activity[] | ((a: Activity[]) => Activity[])) => void;
  setJobs: (jobs: Job[] | ((j: Job[]) => Job[])) => void;
}

export default function DbControls({ setCandidates, setActivities, setJobs }: DbControlsProps) {
  const { toast } = useToast();

  const seedDb = () => {
    if (typeof window !== 'undefined') {
      
      // Generate 25 Jobs
      const newJobs: Job[] = Array.from({ length: 25 }, () => ({
        id: faker.string.uuid(),
        title: faker.person.jobTitle(),
        status: faker.helpers.arrayElement(['Active', 'Archived']),
        tags: faker.helpers.arrayElements(
            ['React', 'TypeScript', 'Remote', 'Node.js', 'PostgreSQL', 'Figma', 'Agile', 'AWS', 'Kubernetes'], 
            { min: 2, max: 4 }
        ),
      }));

      // Generate 1,000 Candidates
      const stages: Stage[] = ['Applied', 'Screening', 'Interview', 'Offer', 'Hired', 'Rejected'];
      const activeJobs = newJobs.filter(j => j.status === 'Active');
      
      const newCandidates: Candidate[] = Array.from({ length: 1000 }, () => {
        const job = faker.helpers.arrayElement(activeJobs);
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();

        return {
          id: faker.string.uuid(),
          name: `${firstName} ${lastName}`,
          email: faker.internet.email({ firstName, lastName }),
          avatarUrl: faker.image.avatar(),
          jobId: job.id,
          jobTitle: job.title,
          stage: faker.helpers.arrayElement(stages),
          applicationDate: faker.date.past({ years: 2 }).toISOString(),
        };
      });

      // Generate 3 Assessments with 10+ questions
      const createQuestions = (count: number): AssessmentQuestion[] => {
        return Array.from({ length: count }, () => {
            const type = faker.helpers.arrayElement<'single-choice' | 'multi-choice' | 'short-text' | 'long-text' | 'numeric-range' | 'file-upload'>([
                'single-choice', 'multi-choice', 'short-text', 'long-text', 'numeric-range', 'file-upload'
            ]);
            let options;
            if (type === 'single-choice' || type === 'multi-choice') {
                options = Array.from({ length: faker.number.int({ min: 3, max: 5 }) }, () => ({ value: faker.lorem.words() }));
            }
            return {
                id: faker.string.uuid(),
                type: type,
                text: faker.lorem.sentence() + '?',
                options,
            };
        });
      }

      const newAssessments: Assessment[] = [
        {
            id: faker.string.uuid(),
            title: 'Advanced Frontend Engineering Challenge',
            description: 'A comprehensive test for senior frontend developers.',
            questions: createQuestions(12),
        },
        {
            id: faker.string.uuid(),
            title: 'Product Design & UX Philosophy',
            description: 'Assess understanding of core design principles and product thinking.',
            questions: createQuestions(10),
        },
        {
            id: faker.string.uuid(),
            title: 'Cloud Infrastructure & DevOps Proficiency',
            description: 'Evaluate knowledge of modern cloud infrastructure and deployment strategies.',
            questions: createQuestions(15),
        },
      ];
      
      const initialActivities: Activity[] = Array.from({ length: 5 }, () => ({
        id: faker.string.uuid(),
        description: `Moved **${faker.person.fullName()}** to ${faker.helpers.arrayElement(stages)} stage.`,
        timestamp: '2 hours ago', // This will cause hydration errors if not handled client-side
        user: { name: faker.person.fullName(), avatarUrl: faker.image.avatar() }
      }));


      // Set data in localStorage
      localStorage.setItem('kanban-candidates', JSON.stringify(newCandidates));
      localStorage.setItem('activities', JSON.stringify(initialActivities));
      localStorage.setItem('jobs', JSON.stringify(newJobs));
      localStorage.setItem('assessments', JSON.stringify(newAssessments));
      localStorage.removeItem('candidate-notes');

      // Update state directly to re-render the UI
      setCandidates(newCandidates);
      setActivities(initialActivities);
      setJobs(newJobs);
      
      toast({
        title: "Database Seeded",
        description: "Local database seeded with 25 jobs, 1000 candidates, and 3 assessments.",
      });
    }
  };

  const clearDb = () => {
    if (typeof window !== 'undefined') {
      // Clear data from localStorage
      localStorage.removeItem('kanban-candidates');
      localStorage.removeItem('activities');
      localStorage.removeItem('jobs');
      localStorage.removeItem('assessments');
      localStorage.removeItem('candidate-notes');
      
      // Update state directly to clear the UI
      setCandidates([]);
      setActivities([]);
      setJobs([]);
      
      toast({
        title: "Database Cleared",
        description: "Your local database has been cleared.",
      });
    }
  };

  return (
    <div className="flex items-center gap-4 rounded-lg border bg-card p-4">
        <div>
            <h3 className="font-semibold text-lg font-headline">Local Database</h3>
            <p className="text-sm text-muted-foreground">Manage your local candidate data for testing.</p>
        </div>
      <div className='ml-auto flex gap-2'>
        <Button variant="outline" onClick={seedDb}>
          <UilDatabase className="mr-2 h-4 w-4" />
          Seed DB
        </Button>
        <Button variant="destructive" onClick={clearDb}>
          <UilTrashAlt className="mr-2 h-4 w-4" />
          Clear DB
        </Button>
      </div>
    </div>
  );
}
