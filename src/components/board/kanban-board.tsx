'use client';

import React, { useState } from 'react';
import KanbanColumn from './kanban-column';
import { initialCandidates } from '@/lib/data';
import { KANBAN_STAGES, type Candidate, type Stage } from '@/lib/types';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { useActivities } from '@/hooks/use-activities';

export default function KanbanBoard() {
  const [candidates, setCandidates] = useLocalStorage<Candidate[]>('kanban-candidates', initialCandidates);
  const [, addActivity] = useActivities();
  const [draggedItem, setDraggedItem] = useState<Candidate | null>(null);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, item: Candidate) => {
    setDraggedItem(item);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetStage: Stage) => {
    e.preventDefault();
    if (!draggedItem) return;

    if (draggedItem.stage !== targetStage) {
      addActivity(`Moved candidate **${draggedItem.name}** from ${draggedItem.stage} to **${targetStage}**.`);
      const updatedCandidates = candidates.map(c =>
        c.id === draggedItem.id ? { ...c, stage: targetStage } : c
      );
      setCandidates(updatedCandidates);
    }
    setDraggedItem(null);
  };

  return (
    <div className="flex gap-6 h-full w-max">
      {KANBAN_STAGES.map((stage) => (
        <KanbanColumn
          key={stage}
          stage={stage}
          candidates={candidates.filter((c) => c.stage === stage)}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        />
      ))}
    </div>
  );
}
