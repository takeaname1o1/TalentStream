
'use client';

import * as React from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogClose,
} from '@/components/ui/dialog';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { initialCandidates } from '@/lib/data';
import { KANBAN_STAGES, type Candidate, type Stage } from '@/lib/types';
import { format } from 'date-fns';
import Link from 'next/link';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { UilEllipsisH, UilSpinner, UilPlusCircle } from '@iconscout/react-unicons';
import { useActivities } from '@/hooks/use-activities';
import { useJobs } from '@/hooks/use-jobs';

const CANDIDATES_PER_PAGE = 10;

export default function CandidateList() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [candidates, setCandidates, isCandidatesLoaded] = useLocalStorage<Candidate[]>('kanban-candidates', initialCandidates);
  const [jobs, , isJobsLoaded] = useJobs();
  const [, addActivity] = useActivities();

  const [movingCandidate, setMovingCandidate] = React.useState<Candidate | null>(null);
  const [deletingCandidate, setDeletingCandidate] = React.useState<Candidate | null>(null);
  const [targetStage, setTargetStage] = React.useState<Stage | null>(null);

  const currentPage = Number(searchParams.get('page')) || 1;
  const searchTerm = searchParams.get('search') || '';
  const stageFilter = searchParams.get('stage') || 'all';
  const jobFilter = searchParams.get('jobId') || 'all';

  const isLoaded = isCandidatesLoaded && isJobsLoaded;

  const createQueryString = React.useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value && value !== 'all') {
        params.set(name, value)
      } else {
        params.delete(name)
      }
      // Reset to page 1 when filters change
      if (name !== 'page') {
        params.delete('page');
      }

      return params.toString()
    },
    [searchParams]
  )

  const handleFilterChange = (key: string, value: string) => {
    router.push(`${pathname}?${createQueryString(key, value)}`);
  };

  const handlePageChange = (direction: 'next' | 'prev') => {
    const newPage = direction === 'next' ? currentPage + 1 : currentPage - 1;
    if (newPage > 0) {
      router.push(`${pathname}?${createQueryString('page', newPage.toString())}`);
    }
  };

  const filteredCandidates = React.useMemo(() => {
    if (!isLoaded) return [];
    return candidates
      .filter(candidate =>
        searchTerm
          ? candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            candidate.email.toLowerCase().includes(searchTerm.toLowerCase())
          : true
      )
      .filter(candidate =>
        stageFilter !== 'all' ? candidate.stage === stageFilter : true
      )
       .filter(candidate =>
        jobFilter !== 'all' ? candidate.jobId === jobFilter : true
      );
  }, [searchTerm, stageFilter, jobFilter, candidates, isLoaded]);

  const totalPages = Math.ceil(filteredCandidates.length / CANDIDATES_PER_PAGE);

  const paginatedCandidates = filteredCandidates.slice(
    (currentPage - 1) * CANDIDATES_PER_PAGE,
    currentPage * CANDIDATES_PER_PAGE
  );
  
  const handleDeleteCandidate = () => {
    if (deletingCandidate) {
        addActivity(`Deleted candidate: **${deletingCandidate.name}**.`);
        setCandidates(prev => prev.filter(c => c.id !== deletingCandidate.id));
        setDeletingCandidate(null);
    }
  };

  const handleMoveStage = () => {
    if (movingCandidate && targetStage) {
        addActivity(`Moved candidate **${movingCandidate.name}** from ${movingCandidate.stage} to **${targetStage}**.`);
        setCandidates(prev => prev.map(c => c.id === movingCandidate.id ? { ...c, stage: targetStage } : c));
        setMovingCandidate(null);
        setTargetStage(null);
    }
  }

  return (
    <>
    <div className="border rounded-lg shadow-sm">
      <div className="p-4 border-b">
        <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4">
                <Input
                    placeholder="Filter candidates by name, email..."
                    className="max-w-sm"
                    defaultValue={searchTerm}
                    onChange={(e) => {
                        // Basic debounce
                        const timer = setTimeout(() => {
                            handleFilterChange('search', e.target.value);
                        }, 500);
                        return () => clearTimeout(timer);
                    }}
                />
                <Select
                    value={jobFilter}
                    onValueChange={(value) => handleFilterChange('jobId', value)}
                >
                    <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by job" />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectItem value="all">All Jobs</SelectItem>
                    {jobs.filter(j => j.status === 'Active').map(job => (
                        <SelectItem key={job.id} value={job.id}>{job.title}</SelectItem>
                    ))}
                    </SelectContent>
                </Select>
                <Select
                    value={stageFilter}
                    onValueChange={(value) => handleFilterChange('stage', value)}
                >
                    <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by stage" />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectItem value="all">All Stages</SelectItem>
                    {KANBAN_STAGES.map(stage => (
                        <SelectItem key={stage} value={stage}>{stage}</SelectItem>
                    ))}
                    </SelectContent>
                </Select>
            </div>
            <Link href="/candidates/new" passHref>
              <Button>
                <UilPlusCircle className="mr-2 h-4 w-4" />
                Add Candidate
              </Button>
            </Link>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Candidate</TableHead>
            <TableHead>Applied For</TableHead>
            <TableHead>Stage</TableHead>
            <TableHead>Application Date</TableHead>
            <TableHead>
              <span className="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedCandidates.length > 0 ? (
            paginatedCandidates.map((candidate) => (
              <TableRow key={candidate.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={candidate.avatarUrl} alt={candidate.name} />
                      <AvatarFallback>{candidate.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{candidate.name}</p>
                      <p className="text-sm text-muted-foreground">{candidate.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{candidate.jobTitle}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{candidate.stage}</Badge>
                </TableCell>
                <TableCell>{format(new Date(candidate.applicationDate), 'PPP')}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <UilEllipsisH className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem asChild>
                        <Link href={`/candidates/${candidate.id}`}>View Profile</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setMovingCandidate(candidate)}>Move Stage</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        className="text-destructive"
                        onClick={() => setDeletingCandidate(candidate)}
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
           ) : (
            <TableRow>
              <TableCell colSpan={5} className="h-24 text-center">
                No results found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {totalPages > 1 && (
        <div className="flex items-center justify-between p-4 border-t">
            <div className="text-sm text-muted-foreground">
            Showing page {currentPage} of {totalPages}
            </div>
            <div className="flex items-center space-x-2">
            <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange('prev')}
                disabled={currentPage <= 1}
            >
                Previous
            </Button>
            <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange('next')}
                disabled={currentPage >= totalPages}
            >
                Next
            </Button>
            </div>
        </div>
      )}
    </div>
    {movingCandidate && (
        <Dialog open={!!movingCandidate} onOpenChange={(isOpen) => !isOpen && setMovingCandidate(null)}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Move {movingCandidate.name}</DialogTitle>
                    <DialogDescription>
                        Select a new stage for this candidate in the hiring pipeline.
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                     <Select onValueChange={(value: Stage) => setTargetStage(value)} defaultValue={movingCandidate.stage}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a stage" />
                        </SelectTrigger>
                        <SelectContent>
                        {KANBAN_STAGES.map(stage => (
                            <SelectItem key={stage} value={stage}>{stage}</SelectItem>
                        ))}
                        </SelectContent>
                    </Select>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="ghost">Cancel</Button>
                    </DialogClose>
                    <Button onClick={handleMoveStage}>Move Candidate</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )}
    {deletingCandidate && (
        <AlertDialog open={!!deletingCandidate} onOpenChange={(isOpen) => !isOpen && setDeletingCandidate(null)}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure you want to delete {deletingCandidate.name}?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the candidate and all associated data from the system.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDeleteCandidate} className='bg-destructive text-destructive-foreground hover:bg-destructive/90'>Delete</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )}
    </>
  );
}
