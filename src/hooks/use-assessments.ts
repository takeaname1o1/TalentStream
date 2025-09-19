
'use client';

import { useLocalStorage } from './use-local-storage';
import type { Assessment } from '@/lib/types';
import { initialAssessments } from '@/lib/data';

export function useAssessments(): [Assessment[], (value: Assessment[] | ((val: Assessment[]) => Assessment[])) => void, boolean] {
  const [assessments, setAssessments, isLoaded] = useLocalStorage<Assessment[]>('assessments', initialAssessments);
  return [assessments, setAssessments, isLoaded];
}
