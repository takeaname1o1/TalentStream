import React from 'react';
import KanbanCard from './kanban-card';
import type { Candidate, Stage } from '@/lib/types';
import { ScrollArea } from '../ui/scroll-area';

interface KanbanColumnProps {
  stage: Stage;
  candidates: Candidate[];
  onDragStart: (e: React.DragEvent<HTMLDivElement>, item: Candidate) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>, targetStage: Stage) => void;
}

export default function KanbanColumn({ stage, candidates, onDragStart, onDragOver, onDrop }: KanbanColumnProps) {
  return (
    <div
      className="flex flex-col w-80 h-full bg-secondary rounded-lg shadow-sm"
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, stage)}
    >
      <div className="p-4 border-b">
        <h3 className="text-lg font-semibold font-headline flex items-center gap-2">
          {stage}
          <span className="text-sm font-normal bg-muted text-muted-foreground rounded-full px-2 py-0.5">
            {candidates.length}
          </span>
        </h3>
      </div>
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {candidates.map((candidate) => (
            <KanbanCard
              key={candidate.id}
              candidate={candidate}
              onDragStart={onDragStart}
            />
          ))}
           {candidates.length === 0 && (
            <div className="flex items-center justify-center h-24 border-2 border-dashed border-muted-foreground/30 rounded-lg">
              <p className="text-sm text-muted-foreground">Drop candidates here</p>
            </div>
           )}
        </div>
      </ScrollArea>
    </div>
  );
}
