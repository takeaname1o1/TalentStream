
import type { Job, Candidate, Activity, Stage, Assessment } from './types';
import React from 'react';
import { faker } from '@faker-js/faker';

// This data is now only used for the initial empty state, 
// or as a fallback if local storage is not available.
// The primary seeding mechanism is now in DbControls.tsx.

export const jobs: Job[] = [
  { id: 'job-1', title: 'Senior Frontend Developer', status: 'Active', tags: ['React', 'TypeScript', 'Remote'] },
  { id: 'job-2', title: 'UX/UI Designer', status: 'Active', tags: ['Figma', 'User Research'] },
  { id: 'job-3', title: 'Product Manager', status: 'Archived', tags: ['Agile', 'Roadmap'] },
];

export const initialCandidates: Candidate[] = [
    {
        id: 'cand-1',
        name: 'Elena Rodriguez',
        email: 'elena.rodriguez@example.com',
        avatarUrl: 'https://picsum.photos/seed/30/40/40',
        jobId: 'job-1',
        jobTitle: 'Senior Frontend Developer',
        stage: 'Interview',
        applicationDate: '2024-05-10T10:00:00Z',
    },
    {
        id: 'cand-2',
        name: 'Marcus Chen',
        email: 'marcus.chen@example.com',
        avatarUrl: 'https://picsum.photos/seed/31/40/40',
        jobId: 'job-2',
        jobTitle: 'UX/UI Designer',
        stage: 'Applied',
        applicationDate: '2024-05-12T14:30:00Z',
    },
];
export const initialActivities: Activity[] = [];
export const initialAssessments: Assessment[] = [
    {
        id: 'assessment-1',
        title: 'Frontend Skills Test',
        description: 'A test to evaluate frontend development skills.',
        questions: [],
    },
];
