
'use client';

import AppHeader from '@/components/layout/header';
import StatCard from '@/components/dashboard/stat-card';
import CandidatesByStageChart from '@/components/dashboard/candidates-by-stage-chart';
import RecentActivities from '@/components/dashboard/recent-activities';
import DbControls from '@/components/dashboard/db-controls';
import { useLocalStorage } from '@/hooks/use-local-storage';
import type { Candidate } from '@/lib/types';
import { initialCandidates } from '@/lib/data';
import { useState, useEffect } from 'react';
import { useActivities } from '@/hooks/use-activities';
import { useJobs } from '@/hooks/use-jobs';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { UilBriefcaseAlt, UilUsersAlt, UilUserPlus, UilArchiveAlt } from '@iconscout/react-unicons';

export default function DashboardPage() {
  const [candidates, setCandidates, isCandidatesLoaded] = useLocalStorage<Candidate[]>('kanban-candidates', initialCandidates);
  const [jobs, setJobs, isJobsLoaded] = useJobs();
  const [activities, addActivity, setActivities] = useActivities();
  const [hiredThisMonth, setHiredThisMonth] = useState(0);
  const [activeJobs, setActiveJobs] = useState(0);
  const [archivedJobs, setArchivedJobs] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const isLoaded = isCandidatesLoaded && isJobsLoaded && isClient;
  
  useEffect(() => {
    if (isLoaded) {
      const hired = candidates.filter(c => {
        if (c.stage !== 'Hired') return false;
        const hiredDate = new Date(c.applicationDate); // Assuming applicationDate is when they were last moved
        const today = new Date();
        return hiredDate.getMonth() === today.getMonth() && hiredDate.getFullYear() === today.getFullYear();
      }).length;
      setHiredThisMonth(hired);

      setActiveJobs(jobs.filter(j => j.status === 'Active').length);
      setArchivedJobs(jobs.filter(j => j.status === 'Archived').length);
    }
  }, [isLoaded, candidates, jobs]);


  return (
    <div className="flex-1 flex flex-col">
      <AppHeader title="Dashboard" />
      <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-8">
        <section>
          <DbControls setCandidates={setCandidates} setActivities={setActivities} setJobs={setJobs} />
        </section>
        <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Active Jobs"
            value={isLoaded ? activeJobs.toString() : '...'}
            icon={<UilBriefcaseAlt className="h-4 w-4 text-muted-foreground" />}
            description="+2 from last month"
          />
          <StatCard
            title="Total Candidates"
            value={isLoaded ? candidates.length.toLocaleString() : '...'}
            icon={<UilUsersAlt className="h-4 w-4 text-muted-foreground" />}
            description="From local storage"
          />
          <StatCard
            title="Hired this Month"
            value={isLoaded ? hiredThisMonth.toString() : '...'}
            icon={<UilUserPlus className="h-4 w-4 text-muted-foreground" />}
            description="Based on `applicationDate`"
          />
          <StatCard
            title="Archived Jobs"
            value={isLoaded ? archivedJobs.toString() : '...'}
            icon={<UilArchiveAlt className="h-4 w-4 text-muted-foreground" />}
            description="7 new archives"
          />
        </section>
        <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {!isClient ? (
                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle className="font-headline">Candidate Pipeline</CardTitle>
                        <CardDescription>Overview of candidates in each hiring stage.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Skeleton className="h-[300px] w-full" />
                    </CardContent>
                </Card>
            ) : <CandidatesByStageChart candidates={candidates} />}
          </div>
          <div className="lg:col-span-1">
            {!isClient ? (
              <Card className="shadow-sm">
                  <CardHeader>
                      <CardTitle className='font-headline'>Recent Activity</CardTitle>
                      <CardDescription>An overview of recent actions in your workspace.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                      {[...Array(5)].map((_, i) => (
                          <div key={i} className="flex items-start gap-4">
                              <Skeleton className="h-9 w-9 rounded-full" />
                              <div className="space-y-2 flex-1">
                                  <Skeleton className="h-4 w-full" />
                                  <Skeleton className="h-3 w-1/4" />
                              </div>
                          </div>
                      ))}
                  </CardContent>
              </Card>
            ) : <RecentActivities />}
          </div>
        </section>
      </main>
    </div>
  );
}
