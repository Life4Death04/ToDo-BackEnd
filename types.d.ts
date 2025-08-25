// Type declarations for backend (editor-only)
export type PriorityTypes = 'LOW' | 'MEDIUM' | 'HIGH';
export type StatusTypes = 'TODO' | 'IN_PROGRESS' | 'DONE';

export type Task = {
  id: number;
  taskName: string;
  description?: string;
  archived: boolean;
  dueDate?: string | null;
  priority: PriorityTypes;
  status: StatusTypes;
  authorId: number;
}

export type User = {
  id: number;
  email: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  avatarUrl?: string | null;
}
