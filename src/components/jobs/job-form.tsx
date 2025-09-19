
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { useActivities } from '@/hooks/use-activities';
import type { Job } from '@/lib/types';
import { jobs as initialJobsData } from '@/lib/data';
import { useJobs } from '@/hooks/use-jobs';
import { faker } from '@faker-js/faker';

const jobSchema = z.object({
  title: z.string().min(1, 'Job title is required'),
  status: z.enum(['Active', 'Archived']),
  tags: z.string().optional(),
});

type JobFormValues = z.infer<typeof jobSchema>;

interface JobFormProps {
  jobId?: string;
}

export default function JobForm({ jobId }: JobFormProps) {
    const router = useRouter();
    const [, addActivity] = useActivities();
    const [jobs, setJobs] = useJobs();
    const existingJob = jobId ? jobs.find(j => j.id === jobId) : undefined;
    const isEditMode = !!existingJob;

    const form = useForm<JobFormValues>({
        resolver: zodResolver(jobSchema),
        defaultValues: {
            title: existingJob?.title || '',
            status: existingJob?.status || 'Active',
            tags: existingJob?.tags.join(', ') || '',
        },
    });

  const onSubmit = (data: JobFormValues) => {
    const newTags = data.tags ? data.tags.split(',').map(tag => tag.trim()).filter(Boolean) : [];

    if (isEditMode && existingJob) {
        const updatedJobs = jobs.map(job => 
            job.id === existingJob.id 
            ? { ...job, title: data.title, status: data.status, tags: newTags } 
            : job
        );
        setJobs(updatedJobs);
        addActivity(`Updated job posting: **${data.title}**.`);
    } else {
        const newJob: Job = {
            id: faker.string.uuid(),
            title: data.title,
            status: data.status,
            tags: newTags,
        };
        setJobs([newJob, ...jobs]);
        addActivity(`Created a new job posting: **${data.title}**.`);
    }
    router.push('/jobs');
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
            <CardContent className="p-6 space-y-6">
                <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Job Title</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder="e.g., Senior Software Engineer" />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {initialJobsData.map(job => (
                                <SelectItem key={job.id} value={job.title}>{job.title}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Status</FormLabel>
                     <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a status" />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Archived">Archived</SelectItem>
                        </SelectContent>
                    </Select>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Tags</FormLabel>
                    <FormControl>
                        <Input placeholder="e.g., React, TypeScript, Remote" {...field} />
                    </FormControl>
                     <FormDescription>
                        Enter tags separated by commas.
                    </FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </CardContent>
        </Card>

        <div className="flex justify-end gap-2">
            <Button type="button" variant="ghost" onClick={() => router.push('/jobs')}>Cancel</Button>
            <Button type="submit">{isEditMode ? 'Save Changes' : 'Create Job'}</Button>
        </div>
      </form>
    </Form>
  );
}
