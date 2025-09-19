
'use client';

import AppHeader from '@/components/layout/header';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { type Candidate } from '@/lib/types';
import { initialCandidates } from '@/lib/data';
import { useEffect, useState } from 'react';
import { notFound, useParams } from 'next/navigation';
import CandidateNotes from '@/components/candidates/candidate-notes';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import CandidateStageTimeline from '@/components/candidates/candidate-stage-timeline';
import { Separator } from '@/components/ui/separator';
import { UilArrowLeft, UilBriefcaseAlt, UilCalendarAlt, UilEnvelope, UilPhone, UilSpinner, UilColumns, UilPen } from '@iconscout/react-unicons';

export default function CandidateProfilePage() {
  const params = useParams();
  const candidateId = params.candidateId as string;
  const [candidates, , isLoaded] = useLocalStorage<Candidate[]>('kanban-candidates', initialCandidates);
  const [candidate, setCandidate] = useState<Candidate | undefined | null>(undefined);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isLoaded && isClient) {
      const foundCandidate = candidates.find(c => c.id === candidateId);
      setCandidate(foundCandidate || null); // Set to null if not found
    }
  }, [isLoaded, isClient, candidates, candidateId]);

  if (!isClient || candidate === undefined) {
    return (
        <div className="flex-1 flex flex-col">
            <AppHeader title="Loading Profile..." />
            <main className="flex-1 p-4 md:p-6 lg:p-8 flex items-center justify-center">
                <div className="flex items-center gap-2 text-muted-foreground">
                    <UilSpinner className="h-6 w-6 animate-spin" />
                    <p className="text-lg">Loading candidate data...</p>
                </div>
            </main>
        </div>
    )
  }

  if (candidate === null) {
    notFound();
  }

  return (
      <div className="flex-1 flex flex-col">
          <AppHeader title="Candidate Profile" />
          <main className="flex-1 p-4 md:p-6 lg:p-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-4 mb-6">
                    <Button variant="outline" size="icon" asChild>
                        <Link href="/candidates">
                           <UilArrowLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <div>
                        
                        <p className="text-muted-foreground">
                            View details for {candidate.name}.
                        </p>
                    </div>
                </div>
              <Card>
                <CardHeader className="border-b">
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                    <Avatar className="h-24 w-24 border">
                      <AvatarImage src={candidate.avatarUrl} alt={candidate.name} />
                      <AvatarFallback>{candidate.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1 flex-1">
                      <h1 className="text-2xl font-bold font-headline">{candidate.name}</h1>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <UilBriefcaseAlt className="h-4 w-4" />
                          <span>{candidate.jobTitle}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <UilCalendarAlt className="h-4 w-4" />
                          <span>Applied on {format(new Date(candidate.applicationDate), 'PPP')}</span>
                        </div>
                      </div>
                       <div className="flex items-center gap-2">
                            <Badge variant="secondary">{candidate.stage}</Badge>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button asChild>
                            <Link href={`/candidates/${candidate.id}/edit`}>
                                <UilPen className="mr-2 h-4 w-4" />
                                Edit Profile
                            </Link>
                        </Button>
                        <Button variant="outline" asChild>
                            <Link href="/board">
                                <UilColumns className="mr-2 h-4 w-4" />
                                Open in Board
                            </Link>
                        </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6 grid gap-6">
                    <div>
                        <h3 className="font-semibold text-lg mb-4 font-headline">Contact Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div className="flex items-center gap-2">
                                <UilEnvelope className="h-4 w-4 text-muted-foreground" />
                                <a href={`mailto:${candidate.email}`} className="text-primary hover:underline">
                                    {candidate.email}
                                </a>
                            </div>
                             <div className="flex items-center gap-2">
                                <UilPhone className="h-4 w-4 text-muted-foreground" />
                                <span>(555) 123-4567</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg mb-4 font-headline">Application Details</h3>
                        <p className="text-sm text-muted-foreground">This is where details about the candidate's application, resume, and cover letter would be displayed.</p>
                    </div>
                    <Separator />
                    <CandidateStageTimeline currentStage={candidate.stage} />
                    <Separator />
                    <CandidateNotes candidateId={candidate.id} />
                </CardContent>
              </Card>
            </div>
          </main>
      </div>
  );
}
