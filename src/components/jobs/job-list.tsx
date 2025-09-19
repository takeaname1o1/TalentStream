
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
import type { Job } from '@/lib/types';
import Link from 'next/link';
import { useJobs } from '@/hooks/use-jobs';
import { UilEllipsisH, UilFileExport, UilSpinner } from '@iconscout/react-unicons';
import { useActivities } from '@/hooks/use-activities';

const JOBS_PER_PAGE = 10;

export default function JobList() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const [jobs, setJobs, isLoaded] = useJobs();
  const [, addActivity] = useActivities();
  const [deletingJob, setDeletingJob] = React.useState<Job | null>(null);

  const searchTerm = searchParams.get('search') || '';
  const statusFilter = searchParams.get('status') || 'all';
  const currentPage = Number(searchParams.get('page')) || 1;

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
  );

  const handleFilterChange = (key: string, value: string) => {
    router.push(`${pathname}?${createQueryString(key, value)}`);
  };

  const handlePageChange = (direction: 'next' | 'prev') => {
    const newPage = direction === 'next' ? currentPage + 1 : currentPage - 1;
    if (newPage > 0) {
      router.push(`${pathname}?${createQueryString('page', newPage.toString())}`);
    }
  };

  const filteredJobs = React.useMemo(() => {
    if (!isLoaded) return [];
    return jobs
      .filter(job =>
        searchTerm
          ? job.title.toLowerCase().includes(searchTerm.toLowerCase())
          : true
      )
      .filter(job =>
        statusFilter !== 'all' ? job.status.toLowerCase() === statusFilter : true
      );
  }, [searchTerm, statusFilter, jobs, isLoaded]);

  
  const handleDeleteJob = () => {
    if (deletingJob) {
        addActivity(`Deleted job: **${deletingJob.title}**.`);
        const updatedJobs = jobs.filter(job => job.id !== deletingJob.id);
        setJobs(updatedJobs);
        setDeletingJob(null);
    }
  }

  const totalPages = Math.ceil(filteredJobs.length / JOBS_PER_PAGE);

  const paginatedJobs = filteredJobs.slice(
    (currentPage - 1) * JOBS_PER_PAGE,
    currentPage * JOBS_PER_PAGE
  );

  if (!isLoaded) {
    return (
        <div className="flex items-center justify-center h-96 border rounded-lg shadow-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
                <UilSpinner className="h-6 w-6 animate-spin" />
                <p className="text-lg">Loading jobs...</p>
            </div>
        </div>
    )
  }


  return (
    <>
    <div className="border rounded-lg shadow-sm">
      <div className="p-4 border-b">
        <div className="flex items-center gap-4">
          <Input 
            placeholder="Filter jobs..." 
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
            value={statusFilter} 
            onValueChange={(value) => handleFilterChange('status', value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="ml-auto">
            <UilFileExport className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Job Title</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Tags</TableHead>
            <TableHead>
              <span className="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedJobs.length > 0 ? (
            paginatedJobs.map((job) => (
              <TableRow key={job.id}><TableCell className="font-medium">
                  <Link href={`/jobs/${job.id}`} className="hover:underline">
                      {job.title}
                  </Link>
                </TableCell><TableCell>
                  <Badge variant={job.status === 'Active' ? 'default' : 'secondary'} className={job.status === 'Active' ? 'bg-green-100 text-green-800' : ''}>
                    {job.status}
                  </Badge>
                </TableCell><TableCell>
                  <div className="flex gap-1">
                    {job.tags.map((tag) => (
                      <Badge key={tag} variant="outline">{tag}</Badge>
                    ))}
                  </div>
                </TableCell><TableCell>
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
                          <Link href={`/jobs/${job.id}`}>View Job</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                          <Link href={`/jobs/${job.id}/edit`}>Edit</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/candidates?jobId=${job.id}`}>View Candidates</Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => setDeletingJob(job)} className="text-destructive">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell></TableRow>
            ))
          ) : (
            <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                    No results found.
                </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
       {totalPages > 1 && (
        <div className="flex items-center justify-between p-4 border-t">
            <div className="text-sm text-muted-foreground">
                Page {currentPage} of {totalPages}
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
    {deletingJob && (
        <AlertDialog open={!!deletingJob} onOpenChange={(isOpen) => !isOpen && setDeletingJob(null)}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure you want to delete this job?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the job posting. It will not delete candidates associated with this job.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDeleteJob} className='bg-destructive text-destructive-foreground hover:bg-destructive/90'>Delete Job</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )}
    </>
  );
}
