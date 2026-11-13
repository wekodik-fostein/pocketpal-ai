import {makeAutoObservable} from 'mobx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {makePersistable} from 'mobx-persist-store';

// Long-term memory: short user-facing notes that are added to the system
// prompt of every chat (normal chats and roleplay pals alike).
export const MAX_MEMORY_NOTES = 50;
export const MAX_MEMORY_NOTE_LENGTH = 300;

export class MemoryStore {
  notes: string[] = [];

  constructor() {
    makeAutoObservable(this);

    makePersistable(this, {
      name: 'MemoryStore',
      properties: ['notes'],
      storage: AsyncStorage,
    });
  }

  addNote(text: string): void {
    const trimmed = text.trim().slice(0, MAX_MEMORY_NOTE_LENGTH);
    if (!trimmed) {
      return;
    }
    this.notes = [...this.notes, trimmed].slice(-MAX_MEMORY_NOTES);
  }

  removeNote(index: number): void {
    this.notes = this.notes.filter((_, i) => i !== index);
  }

  clearNotes(): void {
    this.notes = [];
  }

  // Block appended to the system prompt; empty when there is nothing stored.
  get promptBlock(): string {
    if (this.notes.length === 0) {
      return '';
    }
    return [
      'Long-term memory about the user (use it when relevant, do not recite it):',
      ...this.notes.map(note => `- ${note}`),
    ].join('\n');
  }
}

export const memoryStore = new MemoryStore();
