import AppHeader from '@/components/layout/header';
import KanbanBoard from '@/components/board/kanban-board';

export default function BoardPage() {
  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden">
      <AppHeader title="Candidate Board" />
      <main className="flex-1 overflow-x-auto p-4 md:p-6 lg:p-8">
        <KanbanBoard />
      </main>
    </div>
  );
}
