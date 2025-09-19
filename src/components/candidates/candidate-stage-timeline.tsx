
'use client';

import { KANBAN_STAGES, type Stage } from '@/lib/types';
import { cn } from '@/lib/utils';
import React from 'react';
import { UilCheck, UilLocationPoint, UilCircle } from '@iconscout/react-unicons';

interface CandidateStageTimelineProps {
  currentStage: Stage;
}

const stageColors: Record<Stage, string> = {
    'Applied': 'bg-sky-500 border-sky-500 text-sky-50',
    'Screening': 'bg-blue-500 border-blue-500 text-blue-50',
    'Interview': 'bg-indigo-500 border-indigo-500 text-indigo-50',
    'Offer': 'bg-violet-500 border-violet-500 text-violet-50',
    'Hired': 'bg-emerald-500 border-emerald-500 text-emerald-50',
    'Rejected': 'bg-red-500 border-red-500 text-red-50', // Although not in KANBAN_STAGES, good to have
};

const stageTextColors: Record<Stage, string> = {
    'Applied': 'text-sky-500',
    'Screening': 'text-blue-500',
    'Interview': 'text-indigo-500',
    'Offer': 'text-violet-500',
    'Hired': 'text-emerald-500',
    'Rejected': 'text-red-500',
};

const stageLineColors: Record<Stage, string> = {
    'Applied': 'bg-sky-500',
    'Screening': 'bg-blue-500',
    'Interview': 'bg-indigo-500',
    'Offer': 'bg-violet-500',
    'Hired': 'bg-emerald-500',
    'Rejected': 'bg-red-500',
}

export default function CandidateStageTimeline({ currentStage }: CandidateStageTimelineProps) {
  const currentStageIndex = KANBAN_STAGES.indexOf(currentStage as any);

  return (
    <div>
      <h3 className="font-semibold text-lg mb-6 font-headline">Hiring Timeline</h3>
      <div className="flex items-center">
        {KANBAN_STAGES.map((stage, index) => {
          const isCompleted = currentStageIndex > -1 && index < currentStageIndex;
          const isCurrent = currentStageIndex > -1 && index === currentStageIndex;
          
          return (
            <React.Fragment key={stage}>
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    'h-10 w-10 rounded-full flex items-center justify-center border-2',
                    (isCompleted || isCurrent) ? stageColors[stage] : 'bg-muted border-border'
                  )}
                >
                  {isCompleted ? <UilCheck className="h-5 w-5" /> : (isCurrent ? <UilLocationPoint className="h-5 w-5" /> : <UilCircle className="h-5 w-5 text-muted-foreground/50" />)}
                </div>
                <p className={cn("text-xs mt-2 text-center", isCurrent ? `font-semibold ${stageTextColors[stage]}` : 'text-muted-foreground')}>{stage}</p>
              </div>
              {index < KANBAN_STAGES.length - 1 && (
                <div className={cn("flex-1 h-0.5", (isCompleted || isCurrent) ? stageLineColors[stage] : 'bg-border')} />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
