
'use client';

import { useLocalStorage } from './use-local-storage';
import type { Job } from '@/lib/types';
import { jobs as initialJobs } from '@/lib/data';

export function useJobs(): [Job[], (value: Job[] | ((val: Job[]) => Job[])) => void, boolean] {
  const [jobs, setJobs, isLoaded] = useLocalStorage<Job[]>('jobs', initialJobs);
  return [jobs, setJobs, isLoaded];
}
