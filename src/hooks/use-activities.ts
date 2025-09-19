
'use client';

import { useCallback } from 'react';
import { useLocalStorage } from './use-local-storage';
import type { Activity } from '@/lib/types';
import { initialActivities } from '@/lib/data';
import { formatDistanceToNow } from 'date-fns';

const MAX_ACTIVITIES = 10;
const currentUser = { name: 'John Doe', avatarUrl: 'https://picsum.photos/seed/21/40/40' };

export function useActivities(): [Activity[], (description: string) => void, (activities: Activity[] | ((a: Activity[]) => Activity[])) => void] {
  const [activities, setActivities] = useLocalStorage<Activity[]>('activities', initialActivities);

  const addActivity = useCallback((description: string) => {
    const newActivity: Activity = {
        id: `act-${Date.now()}`,
        description,
        timestamp: formatDistanceToNow(new Date(), { addSuffix: true }),
        user: currentUser,
    };

    setActivities(prevActivities => {
        const updatedActivities = [newActivity, ...prevActivities];
        return updatedActivities.slice(0, MAX_ACTIVITIES);
    });
  }, [setActivities]);

  return [activities, addActivity, setActivities];
}
