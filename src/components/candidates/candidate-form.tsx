
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
import type { Candidate } from '@/lib/types';
import { jobs, initialCandidates } from '@/lib/data';
import { KANBAN_STAGES } from '@/lib/types';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { faker } from '@faker-js/faker';
import { useEffect } from 'react';

const candidateSchema = z.object({
  name: z.string().min(1, 'Candidate name is required'),
  email: z.string().email('Invalid email address'),
  jobId: z.string().min(1, 'Please select a job'),
  stage: z.enum(KANBAN_STAGES),
});

type CandidateFormValues = z.infer<typeof candidateSchema>;

interface CandidateFormProps {
  candidateId?: string;
}

export default function CandidateForm({ candidateId }: CandidateFormProps) {
    const router = useRouter();
    const [, addActivity] = useActivities();
    const [candidates, setCandidates] = useLocalStorage<Candidate[]>('kanban-candidates', initialCandidates);
    const existingCandidate = candidateId ? candidates.find(c => c.id === candidateId) : undefined;
    const isEditMode = !!existingCandidate;

    const form = useForm<CandidateFormValues>({
        resolver: zodResolver(candidateSchema),
        defaultValues: {
            name: '',
            email: '',
            jobId: '',
            stage: 'Applied',
        },
    });

    useEffect(() => {
        if (existingCandidate) {
            form.reset({
                name: existingCandidate.name,
                email: existingCandidate.email,
                jobId: existingCandidate.jobId,
                stage: existingCandidate.stage,
            });
        }
    }, [existingCandidate, form]);


  const onSubmit = (data: CandidateFormValues) => {
    const job = jobs.find(j => j.id === data.jobId);
    if (!job) {
        // This should ideally not happen if the form is correctly populated
        console.error("Selected job not found");
        return;
    }

    if (isEditMode) {
        setCandidates(candidates.map(c => c.id === candidateId ? {
            ...c,
            name: data.name,
            email: data.email,
            jobId: data.jobId,
            jobTitle: job.title,
            stage: data.stage,
        } : c));
        addActivity(`Updated candidate: **${data.name}**.`);
        router.push(`/candidates/${candidateId}`);
    } else {
        const newCandidate: Candidate = {
            id: faker.string.uuid(),
            name: data.name,
            email: data.email,
            avatarUrl: faker.image.avatar(),
            jobId: data.jobId,
            jobTitle: job.title,
            stage: data.stage,
            applicationDate: new Date().toISOString(),
        };
        setCandidates([newCandidate, ...candidates]);
        addActivity(`Added new candidate: **${data.name}**.`);
        router.push('/candidates');
    }
  };
  
  const handleCancel = () => {
    if (isEditMode) {
      router.push(`/candidates/${candidateId}`);
    } else {
      router.push('/candidates');
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
            <CardContent className="p-6 space-y-6">
                <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                        <Input placeholder="e.g., John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                        <Input placeholder="e.g., john.doe@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="jobId"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Applying For</FormLabel>
                     <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                        <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a job posting" />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                        {jobs.filter(j => j.status === 'Active').map(job => (
                            <SelectItem key={job.id} value={job.id}>{job.title}</SelectItem>
                        ))}
                        </SelectContent>
                    </Select>
                    <FormMessage />
                    </FormItem>
                )}
                />
                 <FormField
                control={form.control}
                name="stage"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Initial Stage</FormLabel>
                     <Select onValuechange={field.onChange} defaultValue={field.value} value={field.value}>
                        <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder="Select an initial stage" />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                        {KANBAN_STAGES.map(stage => (
                            <SelectItem key={stage} value={stage}>{stage}</SelectItem>
                        ))}
                        </SelectContent>
                    </Select>
                     <FormDescription>
                        Set the initial stage for this candidate in the hiring pipeline.
                    </FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </CardContent>
        </Card>

        <div className="flex justify-end gap-2">
            <Button type="button" variant="ghost" onClick={handleCancel}>Cancel</Button>
            <Button type="submit">{isEditMode ? 'Save Changes' : 'Add Candidate'}</Button>
        </div>
      </form>
    </Form>
  );
}
