'use client';

import { useCallback } from 'react';
import { useLocalStorage } from './use-local-storage';
import type { Note } from '@/lib/types';

// Hardcoded current user for simplicity
const currentUser = { name: 'John Doe', avatarUrl: 'https://picsum.photos/seed/21/40/40' };

export function useNotes(candidateId: string) {
  const [allNotes, setAllNotes] = useLocalStorage<Note[]>('candidate-notes', []);

  const notes = allNotes.filter(note => note.candidateId === candidateId).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const addNote = useCallback((text: string) => {
    const newNote: Note = {
      id: `note-${Date.now()}`,
      candidateId,
      author: currentUser,
      text,
      createdAt: new Date().toISOString(),
    };
    setAllNotes(prev => [...prev, newNote]);
  }, [candidateId, setAllNotes]);

  const updateNote = useCallback((noteId: string, newText: string) => {
    setAllNotes(prev => prev.map(note => 
      note.id === noteId ? { ...note, text: newText } : note
    ));
  }, [setAllNotes]);

  const deleteNote = useCallback((noteId: string) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
        setAllNotes(prev => prev.filter(note => note.id !== noteId));
    }
  }, [setAllNotes]);

  return { notes, addNote, updateNote, deleteNote };
}
