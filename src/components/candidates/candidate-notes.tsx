
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNotes } from '@/hooks/use-notes';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { formatDistanceToNow } from 'date-fns';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { UilEllipsisH, UilPen, UilTrash } from '@iconscout/react-unicons';

const noteSchema = z.object({
  text: z.string().min(1, 'Note cannot be empty.'),
});

type NoteFormValues = z.infer<typeof noteSchema>;

interface CandidateNotesProps {
  candidateId: string;
}

export default function CandidateNotes({ candidateId }: CandidateNotesProps) {
  const { notes, addNote, updateNote, deleteNote } = useNotes(candidateId);
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);

  const form = useForm<NoteFormValues>({
    resolver: zodResolver(noteSchema),
    defaultValues: { text: '' },
  });

  const editingForm = useForm<NoteFormValues>({
    resolver: zodResolver(noteSchema),
  });

  const handleAddNote = (data: NoteFormValues) => {
    addNote(data.text);
    form.reset();
  };
  
  const handleUpdateNote = (noteId: string, data: NoteFormValues) => {
    updateNote(noteId, data.text);
    setEditingNoteId(null);
  };

  const startEditing = (noteId: string, currentText: string) => {
    setEditingNoteId(noteId);
    editingForm.reset({ text: currentText });
  }

  return (
    <div>
      <h3 className="font-semibold text-lg mb-4 font-headline">Interview Notes</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleAddNote)} className="space-y-4 mb-6">
          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea placeholder="Add a note... (you can @mention colleagues)" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" size="sm">Add Note</Button>
        </form>
      </Form>

      <div className="space-y-6">
        {notes.length === 0 ? (
            <p className="text-sm text-muted-foreground">No notes for this candidate yet.</p>
        ) : (
            notes.map(note => (
            <div key={note.id} className="flex items-start gap-4">
              <Avatar className="h-9 w-9 border">
                <AvatarImage src={note.author.avatarUrl} alt={note.author.name} />
                <AvatarFallback>{note.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                    <div className="flex items-baseline gap-2">
                        <p className="font-semibold">{note.author.name}</p>
                        <p className="text-xs text-muted-foreground">
                            {formatDistanceToNow(new Date(note.createdAt), { addSuffix: true })}
                        </p>
                    </div>
                     <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-6 w-6">
                                <UilEllipsisH className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                             <DropdownMenuItem onClick={() => startEditing(note.id, note.text)}>
                                <UilPen className="mr-2 h-4 w-4" /> Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => deleteNote(note.id)} className="text-destructive">
                                <UilTrash className="mr-2 h-4 w-4" /> Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                {editingNoteId === note.id ? (
                  <Form {...editingForm}>
                    <form onSubmit={editingForm.handleSubmit((data) => handleUpdateNote(note.id, data))} className="space-y-2 mt-2">
                       <FormField
                        control={editingForm.control}
                        name="text"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Textarea {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className='flex gap-2'>
                        <Button type="submit" size="sm">Save</Button>
                        <Button type="button" variant="ghost" size="sm" onClick={() => setEditingNoteId(null)}>Cancel</Button>
                      </div>
                    </form>
                  </Form>
                ) : (
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">{note.text}</p>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
