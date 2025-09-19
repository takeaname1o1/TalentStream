
import React from 'react';
import type { Candidate } from '@/lib/types';
import { Card, CardContent } from '../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { UilEllipsisH, UilUser } from '@iconscout/react-unicons';

interface KanbanCardProps {
  candidate: Candidate;
  onDragStart: (e: React.DragEvent<HTMLDivElement>, item: Candidate) => void;
}

export default function KanbanCard({ candidate, onDragStart }: KanbanCardProps) {
  return (
      <Card
        draggable
        onDragStart={(e) => onDragStart(e, candidate)}
        className="cursor-grab active:cursor-grabbing shadow-md hover:shadow-lg transition-shadow"
      >
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                    <AvatarImage src={candidate.avatarUrl} alt={candidate.name} />
                    <AvatarFallback>{candidate.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                    <p className="font-semibold">{candidate.name}</p>
                    <p className="text-sm text-muted-foreground">{candidate.jobTitle}</p>
                </div>
                </div>
                 <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-6 w-6 -mr-2 -mt-2">
                            <UilEllipsisH className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem asChild>
                             <Link href={`/candidates/${candidate.id}`}>
                                <>
                                <UilUser className="mr-2 h-4 w-4" />
                                View Profile
                                </>
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
          </CardContent>
      </Card>
  );
}
